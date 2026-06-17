/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Sérialisation des enregistrements Prisma au format attendu par les frontends (alias `id` → `_id`, comme le faisait MongoDB)
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

export function toMongoLike<T extends { id: string }>(record: T): Omit<T, 'id'> & { _id: string } {
  const { id, ...rest } = record;
  return { _id: id, ...rest };
}

export function paginate<T>(items: T[], total: number, page: number, limit: number) {
  return {
    items,
    total,
    page,
    limit,
    total_pages: Math.ceil(total / limit),
  };
}
