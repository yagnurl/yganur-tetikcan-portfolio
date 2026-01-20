# Sanity API Token Oluşturma

## Adımlar:

1. https://sanity.io/manage adresine git
2. Projenizi seçin ("Yağnur Portfolio")
3. Sol menüden **API** sekmesine tıklayın
4. **Tokens** bölümüne gidin
5. **Add API token** butonuna tıklayın
6. Token için bir isim verin (örn: "Data Import Token")
7. **Permissions** olarak **Editor** veya **Administrator** seçin
8. **Add token** butonuna tıklayın
9. Oluşan token'ı kopyalayın (bir daha gösterilmeyecek!)

## .env Dosyasına Ekle:

Token'ı kopyaladıktan sonra `.env` dosyasına şu satırı ekle:

```bash
SANITY_API_TOKEN=your_token_here
```

## Import Script'i Çalıştır:

Token'ı ekledikten sonra:

```bash
npm run import-data
```

Bu komut tüm card ve project verilerini otomatik olarak Sanity'ye aktaracak!
