import { UserButton } from "@stackframe/stack";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        <h1>WilsonRIP's Education Hub</h1>
      </div>
      <div className={styles.userButtonContainer}>
        <UserButton />
      </div>
    </header>
  );
}
