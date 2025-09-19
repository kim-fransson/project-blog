// There is a null error bug (solved in 15.5.3) but still present in version 15.4.0-canary.88
import React from "react";

import { BLOG_TITLE } from "@/constants";

import styles from "./not-found.module.css";

export const metadata = {
  title: `404 Not found • ${BLOG_TITLE}`,
};

function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1>404 Not Found</h1>
      <p>
        This page does not exist. Please check the URL and try again.
      </p>
    </div>
  );
}

export default NotFound;
