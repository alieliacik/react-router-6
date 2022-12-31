import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { commentsApi } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './Comments.module.css';
import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
  const { sendRequest, status, data, error } = useHttp()
  const { quoteId } = useParams()
  const [isAddingComment, setIsAddingComment] = useState(false);

  useEffect(() => {
    sendRequest(commentsApi(quoteId))
  }, [sendRequest, quoteId])


  const onCommandAddHandler = useCallback(() => {
    sendRequest(commentsApi(quoteId))
  }, [sendRequest, quoteId])

  let comments;

  if (status === 'pending') {
    comments = <div className="centered">
      <LoadingSpinner />
    </div>
  }

  if (error) {
    <p>Error loading comments</p>
  }

  if (data) {
    const transformedComments = [];
    for (const key in data) {
      const commentObj = {
        id: key,
        ...data[key],
      };
      transformedComments.push(commentObj);
    }

    comments = <CommentsList comments={transformedComments} />
  }

  if (status === 'completed' && data && data.length > 0) {
    <p>No Comment!</p>
  }

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onCommandAddHandler={onCommandAddHandler} />}
      {isAddingComment && comments}
    </section>
  );
};

export default Comments;
