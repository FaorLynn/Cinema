// Node.js 18 minimum. À lancer uniquement sur une base de développement.
// Ne remplace et ne supprime aucun film existant.
import { readFile } from 'node:fs/promises';

const baseUrl = (process.argv[2] || 'http://localhost:8080').replace(/\/$/, '');
const films = JSON.parse(await readFile(new URL('./films-demo.json', import.meta.url), 'utf8'));

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`${options.method || 'GET'} ${path} : HTTP ${response.status}`);
  return response.json();
}

try {
  const existing = await request('/api/film');
  if (!Array.isArray(existing)) throw new Error('La réponse de GET /api/film doit être une liste.');

  for (const film of films) {
    const found = existing.find(item => item.nom === film.nom);
    if (found) {
      console.log(`Déjà présent, conservé : ${film.nom} (ID ${found.id})`);
      continue;
    }
    const created = await request('/api/film', { method: 'POST', body: JSON.stringify(film) });
    if (!Number.isInteger(created.id) || created.nom !== film.nom) {
      throw new Error(`Réponse inattendue après création de ${film.nom}.`);
    }
    existing.push(created);
    console.log(`Ajouté : ${created.nom} (ID ${created.id})`);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
