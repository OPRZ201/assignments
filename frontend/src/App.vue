<script setup lang="ts">
import { RouterView } from 'vue-router'

import { ref } from 'vue'
import { useBreakpoint } from 'vuestic-ui'

const showSidebar = ref(false)

const breakpoints = useBreakpoint()
</script>

<template>
  <VaLayout :left="{ absolute: breakpoints.smDown }" style="height: 100%">
    <template #top>
      <VaNavbar color="primary" class="py-2">
        <template #left>
          <VaButton
            :icon="showSidebar ? 'menu_open' : 'menu'"
            @click="showSidebar = !showSidebar"
          />
        </template>
        <template #center>
          <VaNavbarItem class="font-bold text-lg"> Assignments </VaNavbarItem>
        </template>
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="showSidebar">
        <VaSidebarItem to="/">
          <VaSidebarItemContent>
            <VaIcon name="home" />
            <VaSidebarItemTitle> List </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem to="/create">
          <VaSidebarItemContent>
            <VaIcon name="task" />
            <VaSidebarItemTitle> Create Assignment </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem to="/login">
          <VaSidebarItemContent>
            <VaIcon name="login" />
            <VaSidebarItemTitle> Login </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
    </template>

    <template #content>
      <RouterView class="p-4 overflow-hidden" />
    </template>
  </VaLayout>
</template>

<style></style>
