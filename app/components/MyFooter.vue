<template>
  <footer class="footer">
    <div class="footer__content">
      <div>
        <!-- <Button href="/" variant="empty">
          <img src="/img/logo-light.svg" alt="">
        </Button> -->
      </div>
      <nav>
        <ul>
          <li>
            <MyButton variant="link" luminosity="light">Home</MyButton>
          </li>
          <li>
            <MyButton variant="link" luminosity="light">Home</MyButton>
          </li>
          <li>
            <MyButton variant="link" luminosity="light">Home</MyButton>
          </li>
        </ul>
      </nav>
    </div>

    <div class="footer__copyright">
      <Text variant="small" color="light">Copyright: © 2025 Cooks Delight.</Text>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  max-width: 95vw;
  margin: auto;
  margin-bottom: rem(16);
  padding: rem(0) rem(24) rem(40) rem(24);
  background-color: var(--dark);
  border-radius: rem(32);
  display: flex;
  flex-direction: column;
  gap: rem(15);


  color: var(--light);

  &__content {
    display: flex;
    justify-content: space-between;
    padding: rem(24) rem(0);
    border-bottom: rem(1) solid var(--light-8);
    ul {
      display: flex;
      gap: rem(16);
    }
  }

  &__copyright {
    text-align: center;
    opacity: 60%;
  }
}
</style>
