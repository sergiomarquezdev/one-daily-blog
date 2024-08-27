# One dAIly Blog

One dAIly Blog es una aplicación de blog basada en Angular diseñada para la publicación diaria de contenido.

## Tecnologías

- Angular 18.2.0
- Angular Material 18.2.0
- Express.js 4.18.2
- TailwindCSS 3.4.10
- TypeScript 5.5.2

## Características

- Publicación diaria de contenido generado por IA
- Interfaz de usuario moderna y responsiva
- Integración con redes sociales
- Renderizado del lado del servidor (SSR) para mejor rendimiento y SEO

## Prerrequisitos

- Node.js (v18.18.0 o posterior recomendado)
- Bun (para ejecutar scripts)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/sergiomarquezdev/one-daily-blog.git
   cd one-daily-blog
   ```

2. Instala las dependencias:
   ```bash
   bun install
   ```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
bun run start
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Construcción

Para construir el proyecto:

```bash
bun run build
```

Los artefactos de construcción se almacenarán en el directorio `dist/`.

## Renderizado del Lado del Servidor (SSR)

Para construir y ejecutar la aplicación con SSR:

```bash
bun run start:ssr
```

Este comando construye la aplicación e inicia el servidor SSR.

## Pruebas

Ejecuta las pruebas unitarias con:

```bash
ng test
```

## Comandos Adicionales

- `ng generate component component-name`: Genera un nuevo componente
- `ng generate directive|pipe|service|class|guard|interface|enum|module`: Genera otros artefactos de Angular

## Estructura del Proyecto

- **src/**: Contiene el código fuente de la aplicación.
  - **app/**: Contiene los componentes, servicios y módulos de la aplicación.
  - **assets/**: Contiene los recursos estáticos como imágenes y estilos.
  - **environments/**: Contiene los archivos de configuración de entornos.
- **public/**: Contiene los archivos públicos que se servirán directamente.
- **dist/**: Contiene los artefactos de construcción.
- **server.ts**: Configuración del servidor Express para SSR.

## Configuración

### Tailwind CSS

La configuración de Tailwind CSS se encuentra en `tailwind.config.js`.

### Angular

La configuración de Angular se encuentra en `angular.json`.

### TypeScript

La configuración de TypeScript se encuentra en `tsconfig.json`.

### Servidor

La configuración del servidor Express se encuentra en `server.ts`.

## Contacto

Para preguntas o sugerencias, por favor contacta a Sergio Márquez en [sergiomarquezdev@gmail.com](mailto:sergiomarquezdev@gmail.com).

## Agradecimientos

- Angular CLI
- Angular Material
- Comunidad de TailwindCSS

Para más información sobre Angular CLI, por favor visita la página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
