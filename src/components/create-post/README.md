# Create Post Modal System - Documentation

A fully interactive, modular, and scalable Create Post Modal system for the Social Hub application. Users can switch between different post types using animated tabs with full form validation and submission handling.

## 📁 Component Structure

```
src/components/create-post/
├── CreatePostModal.tsx          # Main modal wrapper with animations
├── CreatePageClient.tsx          # Page client component that manages modal state
├── AnimatedTabs.tsx              # Animated segmented control for post types
├── TextPostForm.tsx              # Text post form with character counter
├── ImagePostForm.tsx             # Image upload form with preview grid
├── PollPostForm.tsx              # Poll creation with dynamic options
├── MoodStatusPostForm.tsx        # Mood/status with activity selector
├── CodeSnippetPostForm.tsx       # Code snippet form with syntax highlighting prep
└── README.md                     # This file

src/app/create/
├── page.tsx                      # Server component that exports metadata

src/components/sidebar/
└── ResponsiveSidebar.tsx         # Responsive sidebar wrapper for mobile support
```

## 🎨 Features

### Post Types

1. **Text Post**
   - Character counter (500 char max)
   - Mood emoji selector
   - Real-time validation

2. **Image Post**
   - Multi-image upload (max 4 images)
   - Image preview grid with removal
   - Caption input
   - Drag-and-drop support ready

3. **Poll Post**
   - Dynamic option management (2-4 options)
   - Poll duration selector (1h, 24h, 7d, 30d)
   - Real-time validation
   - Add/remove options

4. **Mood/Status Post**
   - 8 preset moods with emoji
   - Activity selector (8 activities)
   - Optional message
   - Color-coded mood display

5. **Code Snippet Post**
   - 13 language options
   - Code editor with line counter
   - Optional description
   - Code preview

### UI/UX Features

- **Animated Tab Switching**: Smooth transitions between post types
- **Responsive Design**: Different layouts for mobile and desktop
- **Form Validation**: Real-time validation with visual feedback
- **Modal Animations**: Spring-based animations using Framer Motion
- **Dark Mode**: Built-in dark theme with gradient accents
- **Accessibility**: Proper ARIA labels and semantic HTML

## 🚀 Usage

### Basic Setup

1. Navigate to `/create` to open the modal:
```tsx
// In any page/component
import Link from 'next/link';

export default function SomeComponent() {
  return (
    <Link href="/create">Create Post</Link>
  );
}
```

2. The modal will automatically open and allow users to:
   - Select a post type from the animated tabs
   - Fill in the form for that post type
   - Submit the post (console logs the data)

### Programmatic Modal Control

```tsx
import CreatePostModal from '@/components/create-post/CreatePostModal';
import { useState } from 'react';

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Create Post</button>
      <CreatePostModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
```

## 🔧 Component API

### CreatePostModal Props

```typescript
interface CreatePostModalProps {
  isOpen: boolean;           // Control modal visibility
  onClose: () => void;       // Callback when modal closes
}
```

### AnimatedTabs Props

```typescript
interface AnimatedTabsProps {
  activeTab: PostType;           // Current active tab
  onTabChange: (tab: PostType) => void;  // Tab change handler
}

type PostType = "text" | "image" | "poll" | "mood" | "code";
```

### Form Components

Each form component (`TextPostForm`, `ImagePostForm`, etc.) is standalone and can be used independently:

```tsx
import TextPostForm from '@/components/create-post/TextPostForm';

export default function Custom() {
  return <TextPostForm />;
}
```

## 📝 Data Handling

Each form component logs data to the console on submission:

```javascript
// Text Post
{ content: "Post text" }

// Image Post
{ images: ["base64string1", ...], caption: "Caption" }

// Poll Post
{ question: "Question?", options: ["opt1", "opt2"], duration: "24h" }

// Mood Post
{ mood: "😊", activity: "🎵 Listening to music", message: "optional" }

// Code Snippet Post
{ title: "Title", code: "code snippet", language: "javascript", description: "optional" }
```

### Connecting to Backend

Replace console.log calls in form components with actual API calls:

```tsx
// Example in TextPostForm.tsx
const handlePost = async () => {
  if (content.trim()) {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'text', content })
      });
      // Handle response
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  }
};
```

## 🎯 Customization

### Adding a New Post Type

1. Create a new form component:
```tsx
// src/components/create-post/MyPostForm.tsx
export default function MyPostForm() {
  const handlePost = () => {
    // Submit logic
  };
  
  return (
    <div className="space-y-4">
      {/* Form fields */}
      <Button onClick={handlePost}>Post</Button>
    </div>
  );
}
```

2. Update `AnimatedTabs.tsx`:
```tsx
type PostType = "text" | "image" | "poll" | "mood" | "code" | "mytype";

const postTypes: PostTypeTab[] = [
  // ... existing types
  {
    id: "mytype",
    label: "My Type",
    icon: <MyIcon size={18} />,
    description: "My description",
  },
];
```

3. Update `CreatePostModal.tsx`:
```tsx
import MyPostForm from './MyPostForm';

const renderForm = () => {
  switch (activeTab) {
    // ... existing cases
    case "mytype":
      return <MyPostForm />;
    default:
      return <TextPostForm />;
  }
};
```

### Styling

- **Colors**: Gradient from indigo-500 to fuchsia-500
- **Dark Background**: `bg-[#030313]`
- **Border**: `border-white/10` for consistency
- **Text**: `text-white` with `text-zinc-400` for secondary
- **Hover States**: `hover:bg-white/10` and `hover:text-white`

## 🎬 Animation Details

- **Modal Entry**: Spring animation (stiffness: 300, damping: 30)
- **Tab Switch**: Layout animation with spring physics
- **Form Transitions**: Staggered with 300ms duration
- **Button Interactions**: Scale 0.95 on tap

## ♿ Accessibility

- All buttons have proper `aria-label` attributes
- Form labels are properly associated with inputs
- Modal has `onClick` trap to close on background click
- Keyboard navigation support via native HTML elements
- Proper color contrast ratios maintained

## 🧪 Testing

To test the modal:

```bash
cd Social-Hub
npm run dev
# Navigate to http://localhost:3000/create
```

Check browser console for submitted post data.

## 📦 Dependencies

- `framer-motion` - Animations
- `lucide-react` - Icons
- `react` - UI framework
- `@/components/ui/*` - Shared UI components

## 🚧 Future Enhancements

- [ ] Drag-and-drop image upload
- [ ] Code syntax highlighting
- [ ] Post scheduling
- [ ] Template system
- [ ] Rich text editor for text posts
- [ ] Video upload support
- [ ] GIF picker integration
- [ ] Collaborative posts

## 📝 Notes

- Forms currently log to console; connect to API endpoints
- Modal auto-closes on successful post submission
- Each post type has independent state management
- Fully responsive across mobile, tablet, and desktop
- Uses Next.js 13+ with App Router
