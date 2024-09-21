import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      user: null, 
      posts: [],  
      comments: {}, 
      setUser: (user) => set({ user }),
      setPosts: (posts) => set({ posts }),
      setComments: (postId, comments) => set((state) => ({
        comments: {
          ...state.comments,
          [postId]: comments,
        },
      })),


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

      // Actions for comments (optional, implement as needed)
      addComment: (newComment) => set((state) => ({ comments: [...state.comments, newComment] })),
    }),
    {
      name: 'app-storage', // key for localStorage
      getStorage: () => localStorage, 
    }
  )
);
