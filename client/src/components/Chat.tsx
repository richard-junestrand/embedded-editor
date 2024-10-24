import { useRef, useEffect, useState, Fragment } from 'react';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import axios from 'axios';
//import OpenAI from "openai";
//const openai = new OpenAI();

const Chat = () => {
  const [chatHistory, setChatHistory] = useState<{
    question: string
    loading?: boolean
    error?: string
    answer?: string
  }[]>([])
  const [question, setQuestion] = useState("");
  const onChangeQuestion = (event: any): void => {
    setQuestion(event?.value || "");
  };
  const refChat = useRef<HTMLDivElement | null>(null);
  const askQuestion = (question: string) => {
    if (!!question) {
      setChatHistory(prev => [...prev, { question, loading: true }])
      setQuestion('')
      axios({
        method: 'post',
        url: '/api/chat',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          question
        })
      }).then((res: any) => {
        if (res.data.error) {
          setChatHistory(prev => prev.map(r => r.loading ? { ...r, loading: false, error: res.data.error } : r))
        } else {
          setChatHistory(prev => prev.map(r => r.loading ? { ...r, loading: false, error: undefined, answer: res.data.data } : r))
        }
      }).catch(err => {
        setChatHistory(prev => prev.map(r => r.loading ? { ...r, loading: false, error: err?.message || 'Error' } : r))
      });
    }
  }
  const onSubmitQuestion = (e: any) => {
    e.preventDefault();
    askQuestion(question)
  }
  useEffect(() => {
    if (refChat.current) {
      refChat.current.scrollTop = refChat.current.scrollHeight;
    }
  }, [chatHistory.length])
  return <Fragment>
    <div className='card chat-history' ref={refChat}>
      <div className='card-body d-flex flex-column-reverse'>
        <div>
          {chatHistory.map((r, i) => {
            return <div className='history-item' key={i}>
              <div className='alert alert-dark question'>{r.question}</div>
              <div className={`alert alert-${r.error ? 'danger' : 'primary'} answer`}>
                {r.loading && <div className="spinner-grow loading"></div>}
                {r.error ? <Fragment>{r.error}
                  <span className="link retry"><span onClick={() => askQuestion(r.question)}>Retry</span></span>
                </Fragment> : r.answer}
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
    <div className='card'>
      <div className='card-body'>
        <form onSubmit={onSubmitQuestion}>
          <TextBoxComponent placeholder="Ask me anything" autocomplete='off'
            value={question} change={onChangeQuestion} />
        </form>
      </div>
    </div>
  </Fragment>
};

export default Chat;