"use client"; // Components using hooks like useState or useUser need to be client components

import { stackClientApp } from "@/stack"; // Corrected import path
import { useUser } from "@stackframe/stack"; // Import useUser hook only
import MathQuiz from "../components/MathQuiz";
import GrammarHelp from "../components/GrammarHelp";
import Link from "next/link"; // Use Next.js Link for navigation
import styles from "./page.module.css"; // Import CSS module

export default function HomePage() {
  const user = useUser(); // Get user authentication state

  return (
    <main className={styles.main}>
      {/* Title and UserButton are now in the Header component */}
      <div className={styles.contentArea}>
        <section id="math-quiz" className={styles.section}>
          <h2>Math Quiz</h2>
          {user ? (
            // User is authenticated
            <MathQuiz />
          ) : (
            // User is not authenticated
            <p>
              Please <Link href={stackClientApp.urls.signIn}>sign in</Link> to
              take the quiz.
            </p>
          )}
        </section>

        <section id="grammar-help" className={styles.section}>
          <h2>Grammar Help</h2>
          {/* Grammar Help component will go here - maybe also requires auth? */}
          {/* Ensure GrammarHelp is marked 'use client' if it uses hooks */}
          <GrammarHelp />
        </section>
      </div>
    </main>
  );
}
