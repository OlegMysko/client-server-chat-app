import './MessageList.scss'
export const MessageList = ({ messages }) => (

<>  <ul>
    {messages.map(message => (
      <li key={message.data}
      className='messageBox'>
        <span className='text' >{`${message.userName} from ${message.data.slice(0,-5)}`}

        </span>
        <p className='textMessage'>{message.text}</p>


      </li>
    ))}
  </ul></>
);
