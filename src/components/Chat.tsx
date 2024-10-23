import { useRef, useEffect, useState, Fragment } from 'react';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';

const Chat = () => {
  const [chatHistory, setChatHistory] = useState<{
    question: string
    answer: string
  }[]>([])
  const [question, setQuestion] = useState("");
  const onChangeQuestion = (event: any): void => {
    setQuestion(event?.value || "");
  };
  const refChat = useRef<HTMLDivElement | null>(null);
  const onSubmitQuestion = (e: any) => {
    e.preventDefault();
    setChatHistory(prev => [...prev, { question, answer: `Answer to the question ${question}` }])
    setQuestion("")
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
              <div className='card question'>
                <div className="card-body">{r.question}</div>
              </div>
              <div className='card answer'>
                <div className="card-body">{r.answer}</div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
    <div className='card'>
      <div className='card-body'>
        <form onSubmit={onSubmitQuestion}>
          <TextBoxComponent placeholder="Ask me anything"
            value={question} change={onChangeQuestion} />
        </form>
      </div>
    </div>
  </Fragment>
};

export default Chat;