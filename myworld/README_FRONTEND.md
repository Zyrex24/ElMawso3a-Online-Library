# ElMawso3a Online Library - Modern Frontend

This document describes the new modern frontend implementation for the ElMawso3a Online Library Django application.

## Overview

The frontend has been completely redesigned with:
- **Tailwind CSS** (primary) + **Bootstrap 5** (components)
- **AngularJS 1.8.x** for progressive enhancement
- **Font Awesome** icons
- **RTL support** for Arabic (ar-EG)
- **WCAG AA accessibility** compliance
- **Responsive design** for all devices

## Tech Stack

- **CSS Framework**: Tailwind CSS 3.3.6 (primary), Bootstrap 5.3.2 (selective components)
- **JavaScript**: AngularJS 1.8.3 for interactive features
- **Icons**: Font Awesome 6.5.1
- **Build Tools**: PostCSS, Autoprefixer
- **Fonts**: Inter (English), Noto Sans Arabic (Arabic)

## Project Structure

```
myworld/
├── package.json                 # Node.js dependencies
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── static/
│   ├── src/
│   │   ├── app.css             # Source CSS with Tailwind directives
│   │   └── app.js              # AngularJS application
│   ├── build/
│   │   └── app.css             # Compiled CSS output
│   └── images/
│       └── logo.svg            # Site logo
└── members/templates/
    ├── base.html               # Base template with AngularJS
    ├── header.html             # Responsive navigation with language toggle
    ├── footer.html             # Footer with links and contact info
    ├── index.html              # Modern homepage
    └── [other templates]       # All page templates modernized
```

## Installation & Setup

### 1. Install Node.js Dependencies

```bash
cd myworld
npm install
```

### 2. Build CSS

```bash
# Development (watch mode)
npm run watch:css

# Production build
npm run build:css
```

### 3. Django Setup

Ensure your Django settings include the static files configuration:

```python
# settings.py
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'static/'
STATICFILES_DIRS = [
    BASE_DIR / 'myworld/static'
]
```

### 4. Run Django Server

```bash
python manage.py runserver
```

## Features Implemented

### 🎨 Design System

- **Color Palette**: Primary blue (#2563eb), Secondary gray (#64748b)
- **Typography**: Inter for English, Noto Sans Arabic for Arabic
- **Spacing**: Consistent 8px grid system
- **Components**: Buttons, forms, cards, navigation

### 🌍 Internationalization (i18n)

- **Languages**: English (en-us) and Arabic (ar-EG)
- **RTL Support**: Automatic layout flip for Arabic
- **Language Toggle**: In header navigation
- **Content**: Uses `data-en` and `data-ar` attributes for future translation

### ♿ Accessibility (WCAG AA)

- **Semantic HTML**: Proper heading hierarchy, landmarks
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Color Contrast**: AA compliant contrast ratios

### 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation**: Collapsible mobile menu
- **Grid System**: CSS Grid and Flexbox

### ⚡ Performance

- **CSS Purging**: Unused styles removed in production
- **Font Loading**: Preloaded critical fonts
- **Image Optimization**: Lazy loading, proper alt text
- **Progressive Enhancement**: Works without JavaScript

## Page Templates

All templates have been modernized while preserving backend contracts:

### Core Pages
- `index.html` - Hero section, search, featured books
- `books.html` - Book listing with filters
- `book.html` - Book detail page
- `cart.html` - Shopping cart
- `borrowedbooks.html` - User's borrowed books

### Authentication
- `login.html` - Login form
- `register.html` - Registration form
- `profile.html` - User profile

### Admin
- `admin.html` - Admin dashboard with sidebar
- `addBook.html` - Add book form
- `updateBook.html` - Edit book form

### Information Pages
- `aboutus.html` - About page
- `contactus.html` - Contact page
- `feedback.html` - Feedback form
- `termsofservices.html` - Terms of service
- `privacypolicy.html` - Privacy policy

### Password Reset
- `forgotPassword.html` - Password reset request
- `resetpassword_sent.html` - Reset email sent
- `resetpassword_form.html` - New password form
- `resetpassword_done.html` - Reset complete

## AngularJS Integration

### Controllers

- **MainController**: Language switching, global state
- **SearchController**: Book search functionality
- **CartController**: Cart operations
- **AdminController**: Admin dashboard interactions

### Services

- **LanguageService**: Manages language switching and RTL

### Usage Example

```html
<div ng-controller="SearchController">
    <input ng-model="searchQuery" placeholder="Search books...">
    <button ng-click="performSearch()">Search</button>
</div>
```

## Language Toggle

The language toggle in the header switches between English and Arabic:

```html
<button ng-click="toggleLanguage()" class="language-toggle">
    <i class="fas fa-globe"></i>
    <span ng-if="currentLang === 'en'">عربي</span>
    <span ng-if="currentLang === 'ar'">English</span>
</button>
```

## Backend Compatibility

### Preserved Contracts

- **URLs**: All existing routes maintained
- **Form Names**: Input names and POST endpoints unchanged
- **Context Variables**: Template variables preserved
- **CSRF Tokens**: Present in all forms
- **Django Messages**: Styled and displayed

### Form Examples

```html
<!-- Login form preserves Django form structure -->
<form method="post" action="{% url 'login' %}">
    {% csrf_token %}
    <input type="text" name="username" class="form-input" required>
    <input type="password" name="password" class="form-input" required>
    <button type="submit" class="btn-primary">Login</button>
</form>
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color',
        600: '#your-darker-color',
      }
    }
  }
}
```

### Components

Add custom components in `static/src/app.css`:

```css
@layer components {
  .btn-custom {
    @apply bg-purple-600 text-white px-4 py-2 rounded-lg;
  }
}
```

## Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile**: iOS 13+, Android 8+

## Deployment

### Production Build

```bash
npm run build:css
python manage.py collectstatic
```

### Environment Variables

Move sensitive data to environment variables:

```python
# settings.py
SECRET_KEY = os.environ.get('SECRET_KEY')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'
```

## Troubleshooting

### CSS Not Loading

1. Check `STATICFILES_DIRS` in settings.py
2. Run `npm run build:css`
3. Verify `{% load static %}` in templates

### AngularJS Not Working

1. Check browser console for errors
2. Verify AngularJS CDN is accessible
3. Ensure `ng-app="elmawso3aApp"` is in base.html

### RTL Issues

1. Verify `dir="rtl"` is set for Arabic
2. Check CSS RTL overrides
3. Test language toggle functionality

## Contributing

When making changes:

1. **CSS**: Edit `static/src/app.css`, then run build
2. **Templates**: Preserve Django template syntax and backend contracts
3. **JavaScript**: Follow AngularJS 1.x patterns
4. **Accessibility**: Test with screen readers and keyboard navigation

## License

This frontend implementation is part of the ElMawso3a Online Library project.
