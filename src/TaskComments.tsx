import { useState, useEffect } from 'react';
import type { TaskComment, User } from './types';
import { api } from './api';
import styles from './styles.module.scss';

interface TaskCommentsProps {
  taskId: string;
  users: User[];
  currentUserId?: string;
}

/**
 * TaskComments Component
 * Displays and manages comments for a task:
 * - Fetches comments on mount
 * - Allows adding new comments
 * - Shows commenter name and timestamp
 * - Handles loading and error states
 */
export function TaskComments({ taskId, users, currentUserId = '1' }: TaskCommentsProps) {
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, [taskId]);

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.fetchComments(taskId);
      setComments(response.comments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setError(null);
    try {
      const response = await api.createComment(taskId, currentUserId, newComment.trim());
      setComments([...comments, response.comment]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
      setError('Failed to add comment');
    }
  };

  const getUserName = (userId: string): string => {
    const user = users.find((u) => u.id === userId);
    return user?.name || 'Unknown User';
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.commentsSection} data-testid="task-comments">
      <h4>Comments</h4>

      {error && <p className={styles.error}>{error}</p>}

      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <div className={styles.commentsList}>
          {comments.length === 0 ? (
            <p className={styles.noComments}>No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <strong>{getUserName(comment.userId)}</strong>
                <p>{comment.content}</p>
                <small>{formatTimestamp(comment.createdAt)}</small>
              </div>
            ))
          )}
        </div>
      )}

      <div className={styles.addComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          data-testid="comment-input"
        />
        <button onClick={handleAddComment} data-testid="add-comment-button">
          Add Comment
        </button>
      </div>
    </div>
  );
}
