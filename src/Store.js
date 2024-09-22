import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      user: null, 
      posts: [],  
      setUser: (user) => set({ user }),

      // Actions for user authentication
      loginUser: (user) => set({ user }),
      logoutUser: () => set({ user: null }),

      // Actions for posts
      setPosts: (posts) => set({ posts }),
      addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
      updatePost: (postId, updatedPost) => set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId ? { ...post, ...updatedPost } : post
        ),
      })),

    }),
    {
      name: 'app-storage', // key for localStorage
      getStorage: () => localStorage, 
    }
  )
);
