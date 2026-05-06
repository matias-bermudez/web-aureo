# Aureo — Finanzas Personales

App iOS nativa para gestión de finanzas personales. Sin servidores, sin cuentas, sin suscripciones. Todo corre en el dispositivo.

---

## Propuesta de valor

**Aureo es la app de finanzas que respeta tu privacidad.** Tus datos nunca salen de tu celular. No hay login, no hay nube, no hay terceros que vean cuánto ganás o en qué gastás. Todo es local, rápido y tuyo.

Diseñada para el contexto latinoamericano: soporte nativo para pesos argentinos, tipo de cambio blue, gastos en dólares, cuotas sin interés, inflación.

---

## Pantallas principales

### Inicio
La primera pantalla que ves cada día. Muestra lo que importa sin ruido:

- **Saldo total** por moneda, calculado en tiempo real considerando transacciones, transferencias y depósitos a fondos
- **Presupuesto mensual**: barra de progreso del gasto vs. ingreso configurado, con alerta visual al superar el 80% y 100%
- **Mini tarjetas de cuentas**: scroll horizontal con saldo en tiempo real por cuenta
- **Presupuestos por categoría**: las 4 categorías con más gasto del mes, con barra de progreso y colores (verde → naranja → rojo)
- **Transacciones recientes**: las últimas 5 con acceso rápido a editar o eliminar por context menu
- **Banner "Cobras hoy"**: si el día de cobro configurado llegó y no se registró el ingreso del mes, aparece un banner que pre-completa monto y cuenta para registrarlo con un toque
- **Modo privacidad**: botón en el nav bar que reemplaza todos los montos de la app con •••• en tiempo real

### Movimientos
Tres sub-tabs en un segmented control:

**Gastos**
- Navegación por mes con flechas (izquierda/derecha, bloqueada en mes actual)
- Resumen de total gastado por moneda para el mes seleccionado
- Filtros por categoría en chips horizontales (tipo pill), selección exclusiva
- Búsqueda por comercio o categoría
- Transacciones agrupadas por fecha relativa ("Hoy", "Ayer", "Lunes", etc.)
- Swipe izquierda → eliminar / swipe derecha → editar
- Context menu con las mismas opciones

**Ingresos**
- Mismo esquema de navegación mensual
- Lista separada de transacciones marcadas como ingreso

**Fijos**
- Lista de gastos recurrentes con día de cobro, cuenta y estado
- Badge "Finalizado" (gris) o "Pausado" (naranja) según corresponda
- Icono de campana si las notificaciones están activas
- Swipe para eliminar (cancela notificaciones automáticamente)

### Estadísticas
Powered by **Swift Charts** (nativo de Apple, sin dependencias externas):

- **Selector de período**: semana / mes / año / todo
- **Tarjeta resumen**: total gastado, gasto del período anterior, variación porcentual (badge verde/rojo), gasto promedio diario
- **Gráfico de barras diario**: gastos por día con ejes adaptativos
- **Donut chart por categoría**: con leyenda completa, monto y cantidad de transacciones por categoría

### Presupuesto
Una tarjeta por categoría con:
- Ícono y color propios de la categoría
- Barra de progreso con color dinámico según ratio (verde < 80%, naranja < 100%, rojo ≥ 100%)
- Monto gastado vs. límite mensual, o "Sin límite" si no hay budget definido
- Texto "Excedido" en rojo si se pasó del límite
- Drag & drop para reordenar categorías (modo "Ordenar")
- Crear/editar categorías con nombre, ícono (SF Symbols), color hex, presupuesto y moneda

### Cuentas (débito)
- Saldo calculado en tiempo real: saldo inicial + transacciones + transferencias entrantes - transferencias salientes - depósitos a fondos
- Multi-moneda: si hay cuentas en distintas monedas, se muestra el total por moneda
- Transferencias entre cuentas con soporte cross-currency (tipo de cambio configurable)
- Vista de detalle por cuenta: historial de movimientos incluyendo transferencias y depósitos a fondos

### Tarjetas de crédito
- Monto total que vence este mes (suma de cuotas activas de todas las tarjetas)
- Cuotas con lógica de fecha de cierre: compras después del cierre se imputan al mes siguiente
- Seguimiento de cuotas: cuota N de M, monto mensual, monto total
- Historial de pagos mensuales
- Soporte para múltiples tarjetas simultáneas

### Fondos de ahorro
Tipos: Ahorro, Inversión, Emergencia, Objetivo

- Saldo total en fondos por moneda
- Meta de ahorro opcional con barra de progreso y texto "Faltan $X" / "Meta alcanzada"
- Depósitos: desde una cuenta (descuenta del saldo de la cuenta automáticamente)
- Retiros con registro del movimiento
- Historial de movimientos por fondo
- Liquidación: marcar el fondo como "liquidado" lo mueve a una sección archivada sin eliminarlo
- Notificación cuando se alcanza la meta

---

## Gastos fijos (recurrentes)

El módulo más completo de la app:

- **Cobro automático**: al abrir la app el día igual o posterior al día de cobro configurado, se registra la transacción automáticamente (una sola vez por mes, protegido contra duplicados con `processedMonthsString`)
- **Categoría obligatoria**: con auto-sugerencia mientras escribís el nombre del gasto
- **Cuenta de débito**: el gasto se vincula a la cuenta que lo paga
- **Notificaciones sin abrir la app**: dos notificaciones por `UNCalendarNotificationTrigger` con `repeats: true`:
  - Recordatorio 2 días antes ("Vence en 2 días · $X")
  - Aviso el día del cobro ("Hoy se debitan $X de [Cuenta]")
- **Toggle activo/pausado**: si está pausado, no cobra ni manda notificaciones
- **Fecha de finalización opcional**: mes y año del último cobro. Al superarla, badge "Finalizado" (prioridad sobre "Pausado"), notificaciones canceladas automáticamente en el próximo arranque

---

## Scanner de tickets

Flujo: foto única → OCR → IA o regex → confirmación → pre-completa el formulario.

**Con Apple Intelligence (iOS 26+, iPhone 15 Pro en adelante)**
- Usa `FoundationModels` (corre 100% en el dispositivo, sin tokens, sin API externa)
- `LanguageModelSession` con `@Generable struct AIReceiptAnalysis`
- Extrae: monto total + categoría de la lista del usuario
- El prompt incluye las categorías disponibles para que la IA elija exactamente una

**Sin Apple Intelligence (todos los demás dispositivos)**
- OCR con `VNRecognizeTextRequest` (Vision framework, nativo)
- Preprocesamiento de imagen: escala de grises + contraste con `CIColorControls` (CoreImage) para mejorar lectura en tickets térmicos y fotos con poca luz
- Extracción del monto: regex con 3 patrones (con $, con puntos de miles, con coma decimal)
- Sugerencia de categoría: `AutoCategorizationService` busca keywords del comercio en el texto completo del OCR

**UX del scanner**
- Pantalla previa con 3 tips de calidad de foto
- Badge "Apple Intelligence activo" si está disponible
- Estado de carga con texto adaptado ("Analizando con IA…" vs "Procesando ticket…")
- Pantalla de confirmación: monto editable + categoría sugerida antes de aplicar

---

## Auto-categorización

Funciona en dos contextos:
1. **Al escribir el comercio** en el formulario de transacción: sugiere categoría si no hay una seleccionada
2. **Al escanear un ticket**: aplica sobre el texto completo del OCR

14 categorías default con keywords:
- Comida: mcdonald, burger, pizza, rappi, pedidos, sushi, starbucks, subway, delivery…
- Supermercado: disco, carrefour, jumbo, coto, dia, chango…
- Transporte: uber, cabify, nafta, shell, ypf, axion, sube, parking…
- Salud: farmacia, drogueria, medico, clinica, hospital…
- Suscripciones: netflix, spotify, disney, hbo, amazon, apple, youtube, chatgpt…
- Entretenimiento, Ropa, Tecnología, Personal, Inversiones, Ahorros, Educación, Hogar, Otros

Los keywords son editables por el usuario desde la pantalla de categorías.

---

## Tipo de cambio

- **Fetch automático** desde `dolarapi.com`: oficial, blue, MEP, cripto
- **Ingreso manual** como alternativa
- **Tipo preferido configurable**: el usuario elige cuál usar para cálculos (oficial, blue, MEP, cripto)
- **Conversión en tiempo real** al registrar transacciones en distinta moneda que la cuenta destino
- **Tipo de cambio histórico**: cada transacción guarda el tipo de cambio al momento de la compra

---

## Notificaciones locales

Todas son locales, sin push, sin servidor:

- **Presupuesto**: al guardar un gasto, evalúa si se superó el 50%, 80% o 100% del límite mensual de la categoría. Cada umbral es configurable por separado en Ajustes
- **Gastos fijos**: recordatorio 2 días antes + aviso el día del cobro. Se programan/cancelan automáticamente al guardar cambios
- **Meta de fondo**: al alcanzar el objetivo de ahorro
- **Ingreso mensual**: recordatorio en el día de cobro configurado
- **Resumen mensual de tarjeta de crédito** (programado mensualmente)

---

## Backup y restauración

Sistema propio sin depender de iCloud:

**Exportar**
- Genera un archivo `.aureo` (JSON con encoding ISO8601) con absolutamente todo:
  - Categorías (con keywords, presupuestos, colores)
  - Cuentas débito y transferencias entre cuentas
  - Transacciones (gastos e ingresos) con tipo de cambio histórico
  - Gastos fijos (con estado, meses procesados, fecha de finalización)
  - Fondos de ahorro y todos sus movimientos
  - Tarjetas de crédito, cuotas y pagos
  - Tipos de cambio históricos
  - Configuración completa (moneda, ingreso, notificaciones, etc.)
- El archivo se llama `aureo-backup-YYYY-MM-DD.aureo`
- Se comparte por el iOS share sheet: WhatsApp, iCloud Drive, AirDrop, Mail, Files, lo que sea

**Importar**
- Desde Ajustes → Backup: selector de archivo `.aureo`
- Al tocar un `.aureo` desde cualquier app (WhatsApp, Files, Mail) → iOS abre Aureo directamente
- Al abrirse desde un archivo, la app muestra un alert de confirmación antes de restaurar
- El restore reconstruye todas las relaciones entre objetos por UUID, preservando fechas exactas
- El archivo `.aureo` está registrado como UTI exportada (`com.aureo.backup`) con `LSHandlerRank: Owner`

**Onboarding con restore**
- En la pantalla inicial, botón "Ya tengo un backup · Restaurar" para saltear toda la configuración e importar directo

---

## Monedas soportadas

17 monedas: ARS · USD · EUR · BRL · GBP · JPY · CNY · CAD · CLP · COP · PEN · VES · MXN · CHF · PYG · BOB · UYU

Cada moneda tiene símbolo, nombre y cantidad de decimales correcta (0 para ARS, JPY, CLP, etc.)

---

## Privacidad y seguridad

- **100% local**: ningún dato sale del dispositivo
- **Sin login**: no hay cuentas de usuario
- **Sin suscripción**: compra única (o gratis, según modelo elegido)
- **Sin analytics**: no hay SDKs de terceros, no hay telemetría
- **Modo privacidad**: oculta todos los montos en pantalla con un toque, útil en lugares públicos
- **Backup propio**: el usuario controla dónde guarda sus datos

---

## Stack técnico

- **SwiftUI** + **SwiftData** (iOS 17+)
- **Swift Charts** (gráficos nativos)
- **Vision** (`VNRecognizeTextRequest`) para OCR
- **CoreImage** (`CIColorControls`) para preprocesamiento de imagen
- **FoundationModels** (`LanguageModelSession`) para Apple Intelligence (iOS 26+, compilación condicional)
- **UserNotifications** (`UNCalendarNotificationTrigger`) para notificaciones sin abrir la app
- **UniformTypeIdentifiers** para registro del tipo de archivo `.aureo`
- **UIImagePickerController** para la cámara (compatible con todos los dispositivos)
- Sin dependencias externas: 0 packages de terceros

---

## Requisitos

- iOS 17.0 o superior
- Apple Intelligence (scanner con IA): iOS 26.0+, iPhone 15 Pro o superior (opcional, la app funciona completa sin esto)
- iPhone solamente (iPad no soportado en esta versión)

---

## Estructura del proyecto

```
Aureo/
├── App/
│   ├── AureoApp.swift          # Entry point, container, seed, onOpenURL
│   ├── ContentView.swift       # TabView, FAB, onboarding gate
│   ├── AppState.swift          # Estado compartido (privacy mode, sub-tabs)
│   └── OnboardingView.swift    # Primera configuración + restore desde backup
│
└── Modules/
    ├── Core/
    │   ├── Models/             # Transaction, Category, DebitAccount, Fund,
    │   │                       # FixedExpense, ExchangeRate, CreditCard, AppSettings, Currency
    │   └── Extensions/         # Color+Hex, Date+Period, Double+Currency
    │
    ├── Home/                   # Dashboard principal
    ├── Transactions/           # Gastos, ingresos, gastos fijos + servicios
    ├── Budget/                 # Presupuestos por categoría
    ├── Analytics/              # Estadísticas y gráficos
    ├── Accounts/               # Cuentas débito y transferencias
    ├── CreditCard/             # Tarjetas de crédito y cuotas
    ├── Funds/                  # Fondos de ahorro
    ├── Scanner/                # OCR + Apple Intelligence
    ├── Notifications/          # NotificationService
    └── Settings/               # Ajustes, tipo de cambio, backup/restore
```

---

## Frases clave para marketing

- "Tus finanzas, en tu celular. Solo tuyas."
- "Sin login. Sin nube. Sin terceros."
- "El peso, el dólar, el blue. Todo en un lugar."
- "Sabés exactamente cuánto tenés, cuánto gastaste y cuánto te queda."
- "Con Apple Intelligence, escaneá un ticket y listo."
- "Tus datos son tuyos. Exportalos cuando quieras."

---

## Diferenciadores vs. competencia

| | Aureo | Apps con suscripción | Apps con nube |
|--|--|--|--|
| Sin suscripción mensual | ✅ | ❌ | ❌ |
| 100% privado (sin servidores) | ✅ | Depende | ❌ |
| Apple Intelligence integrado | ✅ | ❌ | ❌ |
| Tipo de cambio blue (Argentina) | ✅ | Raro | Raro |
| Scanner de tickets con IA | ✅ | Pocos | Algunos |
| Backup propio (sin iCloud) | ✅ | Raro | ❌ |
| Gastos fijos automáticos | ✅ | Algunos | Algunos |
| Nativo iOS (SwiftUI puro) | ✅ | Muchos son React Native | Varía |
