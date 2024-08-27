# OneDailyBlog

OneDailyBlog is an Angular-based blog application designed for daily content publishing.

## Technologies

- Angular 18.2.0
- Angular Material 18.2.0
- Express.js 4.18.2
- TailwindCSS 3.4.10
- TypeScript 5.5.2

## Prerequisites

- Node.js (v18.18.0 or later recommended)
- Bun (for running scripts)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/onedaily-blog.git
   cd onedaily-blog
   ```

2. Install dependencies:
   ```
   bun install
   ```

## Development

To start the development server:

```
bun run start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Building

To build the project:

```
bun run build
```

The build artifacts will be stored in the `dist/` directory.

## Server-Side Rendering (SSR)

To build and run the application with SSR:

```
bun run start:ssr
```

This command builds the application and starts the SSR server.

## Testing

Run unit tests with:

```
ng test
```

## Additional Commands

- `ng generate component component-name`: Generate a new component
- `ng generate directive|pipe|service|class|guard|interface|enum|module`: Generate other Angular artifacts

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Angular CLI
- Angular Material
- TailwindCSS community

For more information on Angular CLI, please check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
