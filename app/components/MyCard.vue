<template>
  <div
    class="card"
  >
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
  cursor: pointer;
  height: rem(464);
  transition: transform 0.4s cubic-bezier(0.21, 0.8, 0.32, 1);

  &:hover {
    transform: translateY(rem(-8)) scale(1.015);
  }

  &__img {
    overflow: hidden;
    border-top-left-radius: rem(24);
    border-top-right-radius: rem(24);
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
    }
  }

  &:hover &__img img {
    transform: scale(1.08);
  }

  &__content {
    padding: rem(24) rem(24) rem(16) rem(24);
    border: rem(1) solid var(--dark-16);
    border-bottom-left-radius: rem(24);
    border-bottom-right-radius: rem(24);
    display: flex;
    flex-direction: column;
    gap: rem(40);
    background: var(--lighter);
    transition: background 0.4s ease;
  }

  &__title {
    display: flex;
    flex-direction: column;
    gap: rem(12);
  }

  &__link {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__rating {
    display: flex;
    gap: rem(16);
    align-items: center;
  }
}
</style>
