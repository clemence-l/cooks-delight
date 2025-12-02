<template>
  <header>
    <MyButton href="/index.html" variant="empty">
      <!-- <img src="/img/logo.svg" alt="" /> -->
      <MyText variant="tag">logo</MyText>
    </MyButton>

    <nav>
      <ul>
        <li>
          <MyButton href="/" variant="link" state="active">Recettes</MyButton>
        </li>
        <li>
          <MyButton href="/" variant="link">À Propos</MyButton>
        </li>
      </ul>
    </nav>
    <div>
      <MyButton variant="grey" content="icon">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.6267 11.5129L16 14.8861L14.8861 16L11.5129 12.6267C10.3 13.5971 8.76177 14.1776 7.08881 14.1776C3.17579 14.1776 0 11.0018 0 7.08881C0 3.17579 3.17579 0 7.08881 0C11.0018 0 14.1776 3.17579 14.1776 7.08881C14.1776 8.76177 13.5971 10.3 12.6267 11.5129ZM11.0465 10.9284C12.0096 9.93584 12.6023 8.58187 12.6023 7.08881C12.6023 4.04259 10.135 1.57529 7.08881 1.57529C4.04259 1.57529 1.57529 4.04259 1.57529 7.08881C1.57529 10.135 4.04259 12.6023 7.08881 12.6023C8.58187 12.6023 9.93584 12.0096 10.9284 11.0465L11.0465 10.9284Z"
            fill="#262522"
          />
        </svg>
      </MyButton>
      <MyButton variant="default">S'inscrire</MyButton>
    </div>
  </header>
</template>

<style lang="scss">
header {
  margin: auto;
  max-width: 90vw;
  margin-top: rem(16);
  margin-bottom: rem(16);
  display: flex;
  justify-content: space-between;
  padding: rem(16) rem(24);
  border: 1px solid var(--dark-24);
  border-radius: rem(32);
  align-items: center;

  div {
    display: flex;
    gap: rem(16);
  }
}
ul {
  padding: 0;
  display: flex;
  gap: rem(24);

  li {
    padding: rem(16) rem(8);
    border-bottom: rem(1) solid var(--light-16);
  }
}
</style>
