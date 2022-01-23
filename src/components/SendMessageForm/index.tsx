import styles from './styles.module.scss'
import {VscSignOut} from 'react-icons/all';
import {FormEvent, useContext, useState} from 'react';
import {AuthContext} from '../../contexts/auth';
import {VscGithubInverted} from 'react-icons/vsc';
import {api} from '../../services/api';

export function SendMessageForm() {

  const { user, signOut } = useContext(AuthContext)

  const [message, setMessage] = useState('')

  async function submitMessage(event: FormEvent) {
    event.preventDefault()

    if (!message.trim()) {
      return;
    }
    await api.post('messages', { message })
    setMessage('')
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size="32"/>
      </button>
      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name}/>
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16"/>
          {user?.login}
        </span>
      </header>

      <form className={styles.sendMessageForm} onSubmit={submitMessage}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          onChange={event => setMessage(event.target.value)}
          value={message}
          name="message"
          id="message"
          placeholder="Qual é sua expectativa para o evento?"/>

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  )
}
