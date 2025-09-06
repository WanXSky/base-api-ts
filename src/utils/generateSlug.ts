// src/utils/generateSlug.ts
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()                           // ubah ke huruf kecil
    .trim()                                  // bersihkan spasi di awal/akhir
    .replace(/[^a-z0-9\s-]/g, '')            // hapus karakter aneh (emoji, simbol)
    .replace(/\s+/g, '-')                    // ganti spasi dengan -
    .replace(/-+/g, '-');                    // ganti -- jadi -
};