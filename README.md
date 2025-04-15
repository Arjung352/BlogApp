# 📝 DotBlog – Blogging Platform

**DotBlog** is a multipage blog application that requires you to register before creating and uploading a blog. You can also like a blog if you
enjoy it. It is built with ReactJS, TailwindCSS, React-Routers, and MaterialUI for the front end and ExpressJS and MongoDB for the back
end. I’ve also added lazy loading, ensuring a faster initial load time.

---

## 🚀 Features

- 🖊️ Create, Edit, and Delete Blogs
- 🔒 User Authentication (Signup/Login)
- 🌐 Rich Blog Display with Routing
- 📷 Upload Blog Images via Cloudinary
- 🎨 Styled with TailwindCSS
- 🧠 Modular and Scalable Code Structure

---

## 🛠️ Tech Stack

**Frontend**:  
- React.js (with Vite)  
- TailwindCSS  
- React Router DOM  

**Backend**:  
- Node.js  
- Express.js  
- MongoDB with Mongoose  
- Cloudinary for Image Storage  
- Vercel for Deployment  

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/arjung352/blogapp.git
cd blogapp

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

## 📂 Directory Structure
```plaintext

arjung352-blogapp/
├── client/                     # Frontend code (React + TailwindCSS)
│   ├── README.md               # Frontend specific documentation
│   ├── index.html              # Main HTML entry point
│   ├── package-lock.json       # Dependency lock file
│   ├── package.json            # Frontend dependencies
│   ├── postcss.config.js       # PostCSS configuration for Tailwind
│   ├── tailwind.config.js      # TailwindCSS configuration
│   ├── vite.config.js          # Vite configuration
│   ├── .eslintrc.cjs           # ESLint configuration
│   ├── .gitignore              # Git ignored files
│   ├── public/                 # Static assets
│   │   └── images/             # Image resources
│   └── src/                    # React source files
│       ├── App.jsx             # App routing and layout
│       ├── index.css           # Global styles
│       ├── main.jsx            # React app entry point
│       ├── component/          # Reusable component directory
│       │   ├── AboutMe/        
│       │   │   ├── About.jsx            # About page component
│       │   │   └── Myself/
│       │   │       ├── Myself.css       # Custom styling
│       │   │       └── Myself.jsx       # Profile/About me sub-component
│       │   └── Register/       
│       │       ├── Login.jsx           # Login form component
│       │       └── Signin.jsx          # Signup form component
│       └── page/              # Pages accessible via routing
│           ├── Bloglist.jsx           # List all blogs
│           ├── Create.jsx             # Create a new blog
│           ├── Edit.jsx               # Edit a blog
│           ├── Show.jsx               # Show single blog
│           ├── Footer/    
│           │   └── Footer.jsx         # App footer
│           └── Navbar/
│               └── Navbar.jsx         # Navigation bar

├── server/                     # Backend code (Node.js + Express)
│   ├── cloudinaryConfig.js     # Config for image upload to Cloudinary
│   ├── package-lock.json       # Dependency lock file
│   ├── package.json            # Backend dependencies
│   ├── server.js               # App entry point
│   ├── vercel.json             # Vercel deployment config
│   ├── .gitignore              # Git ignored files
│   ├── model/                  # MongoDB models
│   │   ├── blog.js             # Blog schema
│   │   └── user.js             # User schema
│   └── route/                  # Express routes
│       ├── blogApi.js          # Blog APIs (CRUD)
│       └── userApi.js          # User auth APIs
```
