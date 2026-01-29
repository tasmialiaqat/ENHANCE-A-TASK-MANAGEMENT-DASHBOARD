import { useState } from 'react';
import type { TaskComment, User } from './types';
import styles from './styles.module.scss';

interface TaskCommentsProps {
  taskId: string;
  users: User[];
  currentUserId?: string;
}

export function TaskComments({ taskId, users, currentUserId = '1' }: TaskCommentsProps) {
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const getUserName = (userId: string): string => {
    const user = users.find((u) => u.id === userId);
    return user?.name || 'Unknown User';
  };

  return (
    <div className={styles.commentsSection} data-testid="task-comments">
      <h4>Comments</h4>

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
                <small>{comment.createdAt}</small>
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
