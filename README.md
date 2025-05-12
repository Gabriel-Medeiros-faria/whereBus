# whereBus

**Plataforma de rastreamento veicular em tempo real** feita com **React**, **Vite**, **TypeScript**, **TailwindCSS**, **React Query**, **Google Maps API** e **Radix UI**.

---

## 🚀 Tecnologias Utilizadas

- [Vite](https://vitejs.dev/) — Build tool
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod) — Validação de formulários
- [React Query (TanStack)](https://tanstack.com/query/latest)
- [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide React Icons](https://lucide.dev/)
- [Recharts](https://recharts.org/)

---

## 📦 Estrutura do Projeto

```
├── public/
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── MapComponent.tsx
│   │   ├── VehicleTable.tsx
│   │   └── VehicleDetailsDialog.tsx
│   ├── pages/
│   │   └── Index.tsx
│   ├── services/
│   │   └── vehicleService.ts
│   ├── types/
│   │   └── vehicle.ts
│   ├── lib/
│   │   └── utils.ts
│   └── main.tsx
```

---

## 🌍 Funcionalidades

- Consulta de veículos por API com paginação
- Mapa interativo com Google Maps mostrando localização de cada veículo
- Ícones personalizados com status de ignição (ligado/desligado)
- Caixa de detalhes do veículo ao clicar no marcador
- Atualização automática dos dados a cada 2 minutos
- Responsividade e experiência otimizada com Radix UI
- Filtros por tipo de veículo
- Busca por placa e frota
- Integração com o Google Maps (botão para abrir localização no navegador)

---

## ⚙️ Scripts disponíveis

- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Compila a aplicação para produção
- `npm run preview` — Visualiza o build de produção
- `npm run lint` — Analisa o código com ESLint

---

## 🗺️ Google Maps

Este projeto utiliza a [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview).  
Certifique-se de fornecer sua chave em `VITE_GOOGLE_MAPS_API_KEY` no arquivo `.env`.

---

## 📁 Ambiente de desenvolvimento

Crie um arquivo `.env` na raiz com a seguinte variável:

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

---

## 👤 Autor

Gabriel Medeiros — [LinkedIn](https://www.linkedin.com/gabrielmedeirosdev)  
Desenvolvedor responsável pela construção completa da plataforma.

---
