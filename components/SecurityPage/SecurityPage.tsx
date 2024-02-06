import styles from './SecurityPage.module.scss';
export default function SecurityPage() {
  return (
    <div>
      <div className={styles.infoBlock}>
        Обратите внимание на то, что если Вы авторизовывались через социальную сеть - пароль
        установлен автоматически. Поэтому для того, чтобы сменить его - воспользуйтесь сбросом, а в
        дальнейшем вы сможете менять его через эту страницу
      </div>
    </div>
  );
}
