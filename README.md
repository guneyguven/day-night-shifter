# Day & Night Bento Portföy

Bootstrap 5 tabanlı statik portföy ve Next.js eşleniği ile iki ayrı dağıtım seçeneği sunan modern bir bento tasarımı. Karanlık/aydınlık tema tercihi tarayıcıda saklanır, yükleme animasyonları ve mikro geçişler deneyimi zenginleştirir.

## Özellikler
- **Bento grid tasarımı:** Bootstrap 5 ızgara sistemiyle kart bazlı düzen.
- **Tema seçimi:** Dark/Light tercihi `localStorage` ile kalıcı.
- **Animasyonlar:** Yüklenme katmanı, kart geçişleri ve hover efektleri.
- **Blog içeriği:** `blog/posts` altında düz metin dosyaları ve `blog/images` altında görseller. `index.json` ile listeye eklemek yeterli.
- **Footer bağlantıları:** Sol tarafta otomatik güncellenen yıl bilgisi, sağda LinkedIn ve e-posta kısayolları (e-posta Contact bölümüne gider).
- **Çift sürüm:** 
  - Kök dizindeki `index.html` Bootstrap 5 sürümüdür.
  - `next-portfolio/` klasörü Next.js sürümüdür (Vercel için hazır).

## Statik (Bootstrap 5) sürümü
1. Depoyu klonlayın ve `index.html` dosyasını tarayıcıda açın veya bir statik sunucuyla yayınlayın.
2. Blog yazısı eklemek için `blog/posts/index.json` içine yeni kayıt ekleyin ve aynı klasöre `.txt` içeriği ekleyin. Görseller `blog/images` altına konumlanır.
3. Tema tercihi otomatik hatırlanır; yeni ziyaretlerde korunur.

## Next.js sürümü
1. `cd next-portfolio`
2. `npm install`
3. `npm run dev` ile yerelde çalıştırın. Varsayılan port `3000`.
4. Blog içeriği için `public/blog/posts/index.json` ve ilgili `.txt` dosyalarını kullanın. Görseller `public/blog/images` altındadır.

## Lisans
[MIT](LICENSE)
