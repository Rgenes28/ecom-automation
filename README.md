# Resumen del Curso de QA Automation con Playwright

Este documento resume los aprendizajes, prácticas y herramientas adquiridas durante el curso de automatización de pruebas QA utilizando Playwright.

---

## ✪ 1. Introducción a Playwright
- Entendimos qué es Playwright y sus ventajas frente a otras herramientas como Selenium.
- Instalamos y configuramos el entorno de trabajo con Playwright y TypeScript.
- Aprendimos comandos clave como:
  - `npx playwright codegen`
  - `npx playwright test`
  - `npx playwright show-trace`
- Estructuramos el proyecto en carpetas:
  - `tests/`
  - `pages/`
  - `utils/`

---

## 📄 2. Page Object Model (POM)
- Separación clara de responsabilidades:
  - **Tests**: describen el comportamiento esperado.
  - **Pages**: encapsulan interacciones con elementos de la interfaz.
- Creamos clases como:
  - `HomePage`
  - `RegisterPage`
  - `LoginPage`
  - `CheckoutPage`
- Uso correcto de locators y buenas prácticas para mantener los tests legibles y escalables.

---

## ✅ 3. Pruebas End-to-End (E2E)
- Automatizamos flujos completos que simulan el comportamiento real del usuario:
  - Registro de usuario.
  - Inicio de sesión.
  - Navegación y selección de productos.
  - Checkout y orden final.
- Verificamos comportamientos con:
  - `expect(locator).toBeVisible()`
  - `expect(locator).toHaveText()`
  - `expect(page).toHaveURL()`

---

## ↻ 4. Sincronización y estabilidad de pruebas
- Uso de esperas automáticas proporcionadas por Playwright.
- Prácticas recomendadas:
  - `await expect(locator).toBeVisible()` antes de interactuar.
  - `await page.waitForURL()` al cambiar de página.
  - Manejo de `page.waitForEvent('dialog')` para alertas.
- Soluciones a errores comunes de visibilidad y estabilidad.

---

## 📸 5. Capturas de pantalla y depuración
- Uso de `page.screenshot()` para validar visualmente.
- Captura condicional después de verificaciones exitosas.
- Uso de `page.pause()` y `show-trace` para debug paso a paso.

---

## 🚫 6. CI/CD y pruebas en el pipeline
- Identificamos diferencias entre pruebas locales y en CI (GitHub Actions).
- Manejo de elementos no interactuables por modales o overlays.
- Estrategias:
  - Asegurar visibilidad real.
  - Scroll automático o forzado.
  - Evitar "flaky tests" mediante buenas prácticas de sincronización.

---

## 🧱 7. Datos dinámicos y usuarios
- Generación de emails aleatorios para evitar duplicados.
- Automatización de creación y eliminación de usuarios.
- Captura y validación de alertas como "Order saved successfully!"

---

Este curso nos brindó herramientas para realizar automatizaciones confiables, escalables y alineadas con flujos reales de usuarios en ambientes modernos.

---

✨ *Listo para aplicar Playwright en proyectos reales de QA Automation.*

