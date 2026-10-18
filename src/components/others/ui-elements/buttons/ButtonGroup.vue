<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon, MinusIcon, PlusIcon } from '@/icons/layout'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
</script>

<template>
  <div class="flex flex-col gap-4">
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Go Back">
          <ArrowLeftIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Report</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Go Next">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
    <ButtonGroup orientation="vertical" aria-label="Media controls" class="h-fit">
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  </div>
</template>
