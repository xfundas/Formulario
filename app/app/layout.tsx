import './globals.css';

export const metadata = {
  title: 'Formulario de Facturación',
  description: 'Formulario para solicitar facturación',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
