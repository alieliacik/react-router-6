import { useRef, useEffect } from 'react';
import useHttp from '../../hooks/use-http'
import { commentsApi } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './NewCommentForm.module.css';

const NewCommentForm = ({ quoteId, onCommandAddHandler }) => {
  const { sendRequest, status, error } = useHttp()
  const commentTextRef = useRef();

  useEffect(() => {
    if (status === 'completed' && !error) {
      onCommandAddHandler();
    }
  }, [status, error, onCommandAddHandler]);

  const submitFormHandler = (e) => {
    e.preventDefault();
    sendRequest(
      commentsApi(quoteId),
      JSON.stringify({ text: commentTextRef.current.value }),
      'post'
    )
  };

  if (status === 'pending') {
    return <div className="centered"> <LoadingSpinner /></div>
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
