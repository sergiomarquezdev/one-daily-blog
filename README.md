# One dAIly Blog: Un blog diario generado por IA

## Descripción

One dAIly Blog es una aplicación de blog basada en Angular diseñada para la publicación diaria de contenido.

## Tecnologías utilizadas

* Angular
* Angular Material
* TailwindCSS
* TypeScript

## Características

* Publicación diaria de contenido generado por IA
* Interfaz de usuario moderna y responsiva

## Prerrequisitos

* Node.js (v18.18.0 o posterior recomendado)

## Instalación

1. Clona el repositorio y cambia al directorio del proyecto:

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
  - **environments/**: Contiene los archivos de configuración de entornos.
- **public/**: Contiene los archivos públicos que se servirán directamente.
  - **assets/**: Contiene los recursos estáticos como imágenes y estilos.
- **dist/**: Contiene los artefactos de construcción.

## Configuración

### Tailwind CSS

La configuración de Tailwind CSS se encuentra en `tailwind.config.js`.

### Angular

La configuración de Angular se encuentra en `angular.json`.

### TypeScript

La configuración de TypeScript se encuentra en `tsconfig.json`.

## Contacto

Para preguntas o sugerencias, por favor contacta a Sergio Márquez en [sergiomarquezdev@gmail.com](mailto:sergiomarquezdev@gmail.com).

## Agradecimientos

- Angular CLI
- Angular Material
- Comunidad de TailwindCSS

Para más información sobre Angular CLI, por favor visita la página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
