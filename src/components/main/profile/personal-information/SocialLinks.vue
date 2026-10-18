<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterXIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'
import type { SocialLinksProps } from './types'

const props = defineProps<SocialLinksProps>()

const links = computed(() => [
  { name: 'Facebook', href: props.socialLinks.facebook || '#', icon: FacebookIcon },
  { name: 'X', href: props.socialLinks.x || '#', icon: TwitterXIcon },
  { name: 'LinkedIn', href: props.socialLinks.linkedin || '#', icon: LinkedinIcon },
  { name: 'Instagram', href: props.socialLinks.instagram || '#', icon: InstagramIcon },
])
</script>

<template>
  <div :class="cn('flex flex-col gap-2 sm:gap-3', className)">
    <p class="text-xs font-normal text-gray-500 sm:text-sm dark:text-gray-400">Social links</p>
    <div class="flex flex-wrap items-center gap-2">
      <template v-for="link in links" :key="link.name">
        <Button
          v-if="Boolean(link.href && link.href.trim())"
          variant="outline"
          size="icon"
          as-child
          :aria-label="link.name"
          class="rounded-full"
        >
          <a :href="link.href" target="_blank" rel="noreferrer">
            <component :is="link.icon" class="size-5 fill-current" />
          </a>
        </Button>
        <div
          v-else
          :aria-label="link.name"
          class="flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-theme-xs sm:size-11 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-600"
        >
          <component :is="link.icon" class="size-5 fill-current" />
        </div>
      </template>
    </div>
  </div>
</template>
