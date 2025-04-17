# Development Principles and Guidelines

## Core Principles

### 1. Design & UI/UX
- Use a consistent color palette based on deep purples and indigos
- Maintain responsive design with mobile-first approach
- Implement smooth animations and transitions using Framer Motion
- Follow modern glassmorphism design patterns with subtle gradients
- Ensure accessibility (WCAG) compliance

### 2. Code Structure
- Keep components modular and reusable
- Use TypeScript for type safety
- Follow the DRY (Don't Repeat Yourself) principle
- Implement proper error handling and logging
- Use meaningful variable and function names

### 3. Performance
- Optimize images using Next.js Image component
- Implement lazy loading where appropriate
- Minimize bundle size
- Use proper caching strategies
- Monitor and optimize Core Web Vitals

### 4. State Management
- Use React hooks for local state
- Keep state management simple and predictable
- Avoid prop drilling by using context where appropriate
- Document state changes and side effects

### 5. API Integration
- Use environment variables for sensitive data
- Implement proper error handling for API calls
- Use TypeScript interfaces for API responses
- Cache API responses where appropriate

### 6. Security
- Never expose API keys or sensitive data
- Implement proper form validation
- Use secure headers and CORS policies
- Follow security best practices for user data

### 7. Testing
- Write unit tests for critical components
- Implement integration tests for key user flows
- Test responsive design across devices
- Ensure cross-browser compatibility

## Coding Pattern Preferences

### Code Organization & Simplicity
- Always prefer simple solutions
- Keep the codebase very clean and organized
- Avoid having files over 200-300 lines of code. Refactor at that point
- Avoid writing scripts in files if possible, especially if the script is likely only to be run once

### Code Reusability & Environment Awareness
- Avoid duplication of code whenever possible, which means checking for other areas of the codebase that might already have similar code and functionality
- Write code that takes into account the different environments: dev, test, and prod
- Never add stubbing or fake data patterns to code that affects the dev or prod environments
- Mocking data is only needed for tests, never mock data for dev or prod

### Change Management
- You are careful to only make changes that are requested or you are confident are well understood and related to the change being requested
- When fixing an issue or bug, do not introduce a new pattern or technology without first exhausting all options for the existing implementation. And if you finally do this, make sure to remove the old implementation afterwards so we don't have duplicate logic
- Never overwrite my .env file without first asking and confirming

## File Structure
```
portfolio/
├── app/                    # Next.js app directory
│   ├── components/        # Reusable UI components
│   ├── lib/              # Utility functions and helpers
│   └── styles/           # Global styles and CSS modules
├── public/               # Static assets
└── types/               # TypeScript type definitions
```

## Component Guidelines
1. Each component should:
   - Have a single responsibility
   - Be properly typed with TypeScript
   - Include proper error boundaries
   - Be responsive by default
   - Include proper loading states

2. Styling:
   - Use Tailwind CSS for styling
   - Follow the project's color scheme
   - Maintain consistent spacing
   - Use proper responsive classes

## Best Practices
1. Git Workflow:
   - Write clear commit messages
   - Create feature branches
   - Review code before merging
   - Keep commits atomic and focused

2. Documentation:
   - Document complex logic
   - Include JSDoc comments for functions
   - Keep README up to date
   - Document environment setup

3. Performance:
   - Optimize images and assets
   - Minimize dependencies
   - Use proper caching strategies
   - Monitor bundle size

4. Accessibility:
   - Use semantic HTML
   - Include proper ARIA labels
   - Ensure keyboard navigation
   - Test with screen readers

## Environment Setup
1. Required Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

2. Development Tools:
   - Node.js 18+
   - npm or yarn
   - VS Code with recommended extensions
   - Git

## Deployment
1. Pre-deployment Checklist:
   - Run all tests
   - Check for TypeScript errors
   - Verify environment variables
   - Test build locally

2. Deployment Process:
   - Use static exports for Netlify
   - Configure proper build commands
   - Set up environment variables
   - Monitor deployment logs

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
5. Wait for review and approval

## Questions or Issues?
Create an issue in the repository or contact the maintainers directly. 