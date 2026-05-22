/* eslint-disable */
const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src', 'app'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove duplicate export defaults like "export default Home;" at the end
    let newContent = content.replace(/^export default [A-Za-z0-9_]+;\s*$/gm, "");
    
    // Fix duplicate React imports
    let reactImportMatches = newContent.match(/import React.*?from 'react';/g);
    if (reactImportMatches && reactImportMatches.length > 1) {
       newContent = newContent.replace(/import React.*?from 'react';\n/, ""); // Remove first one
    }
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Cleaned exports in ${filePath}`);
    }
  }
});
