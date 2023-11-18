import { supabase } from './client';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

export const api = {
    // Create a new post
    createPost: async (data) => {
        const { data: post, error } = await supabase.from('posts').insert(data).single();
        if (error) throw error;
        return post;
    },

    // Create a new comment
    createComment: async (data) => {
        const { data: comment, error } = await supabase.from('comments').insert(data).single();
        if (error) throw error;
        return comment;
    },

    // Delete a post by ID
    deletePost: async (id) => {
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) throw error;
    },

    // Delete a comment by ID
    deleteComment: async (id) => {
        const { error } = await supabase.from('comments').delete().eq('id', id);
        if (error) throw error;
    },

    // Update a post by ID
    updatePost: async (id, data) => {
        const { data: post, error } = await supabase
            .from('posts')
            .update({
                title: data.title,
                white_name: data.white_name,
                black_name: data.black_name,
                white_elo: data.white_elo,
                black_elo: data.black_elo,
            })
            .eq('id', id)
            .single();
        if (error) throw error;
        return post;
    },

    // Update a comment by ID
    updateComment: async (id, data) => {
        const { data: comment, error } = await supabase.from('comments').update(data).eq('id', id).single();
        if (error) throw error;
        return comment;
    },

    // Fetch all posts
    getPosts: async () => {
        const { data: posts, error } = await supabase.from('posts').select('*');
        if (error) throw error;
        return posts;
    },

    // Fetch all comments for a post by post ID
    getCommentsForPost: async (postId) => {
        const { data: comments, error } = await supabase.from('comments').select('*').eq('postId', postId);
        if (error) throw error;
        return comments;
    },

    getPostById: async (id) => {
        const { data: post, error } = await supabase.from('posts').select('*').eq('id', id).single();
        if (error) throw error;
        return post;
    },

    upvotePost: async (id, newCount) => {
        const { data: post, error } = await supabase
            .from('posts')
            .update({ upvotes: newCount })
            .eq('id', id)
            .single();
        if (error) throw error;
        return post;
    },

    upvoteComment: async (id, newCount) => {
        const { data: comment, error } = await supabase
            .from('comments')
            .update({ upvotes: newCount })
            .eq('id', id)
            .single();
        if (error) throw error;
        return comment;
    },
};
