<template>
  <div class="card">
    <div class="card__img">
      <slot name="img" />
    </div>

    <div class="card__content">
      <div class="card__title">
        <MyText variant="h3">
          <slot name="h3" />
        </MyText>

        <MyText variant="par2">
          <slot name="desc" />
        </MyText>
      </div>

      <div class="card__link">
        <MyText variant="small">
          <slot name="ratings" />
        </MyText>

        <div>
          <slot name="link" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card {
  position: relative;
  display: flex;
  flex-direction: column;

  /* IMAGE */
  &__img {
    max-height: rem(234);
    overflow: hidden;
    border-top-left-radius: rem(24);
    border-top-right-radius: rem(24);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  /* CONTENT */
  &__content {
    padding: rem(24) rem(24) rem(16) rem(24);
    border: rem(1) solid var(--dark-16);
    border-bottom-left-radius: rem(24);
    border-bottom-right-radius: rem(24);
    display: flex;
    flex-direction: column;
    gap: rem(40);
  }

  /* TITLE BLOCK */
  &__title {
    display: flex;
    flex-direction: column;
    gap: rem(12);
    height: rem(100);
  }

  /* LINK */
  &__link {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* RATING */
  &__rating {
    display: flex;
    gap: rem(16);
    align-items: center;
  }
}
</style>
