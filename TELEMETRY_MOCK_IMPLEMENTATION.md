# 📋 Cambios en Telemetría IoT - Implementación de Mock Data

## Resumen
Se ha configurado el módulo de `vehicle-wellness` para utilizar **mock data** temporalmente mientras se completa la implementación completa del bounded context. Los datos simulan lecturas reales de sensores IoT incluyendo: temperatura, presión, impacto, calidad del aire y ubicación GPS.

## 🔧 Cambios Realizados

### 1. **Nuevo Archivo: `wellness-metric-mock.data.ts`**
   **Ubicación:** `src/app/vehicle-wellness/infrastructure/wellness-metric-mock.data.ts`
   
   **Contenido:**
   - `MOCK_WELLNESS_METRICS[]` - Array con 5 registros de ejemplo con datos realistas:
     - Temperatura: 35-44.5°C
     - Presión: ~1013 hPa
     - CO2: 410-455 ppm
     - Impacto: Detectado en algunos registros
     - Ubicación GPS: Cartagena (10.39°N, 75.48°O)
   
   - `getMockMetricsByVehicleId(vehicleId)` - Función para obtener métricas filtradas por vehículo
   - `generateRandomMockMetric(vehicleId)` - Genera datos aleatorios para simulación en tiempo real

### 2. **Modificación: `wellness-metric-api.service.ts`**
   **Ubicación:** `src/app/vehicle-wellness/infrastructure/wellness-metric-api.service.ts`
   
   **Cambios:**
   - ✅ Agregado flag `USE_MOCK_DATA = true` (TODO comment para futura remoción)
   - ✅ Todos los métodos ahora usan mock data:
     - `getWellnessMetricById()` - Busca en mock data
     - `getAllWellnessMetrics()` - Retorna todos los mocks
     - `getWellnessMetricsByVehicleId()` - Filtra por vehículo
     - `createWellnessMetric()` - Simula creación (genera ID)
     - `updateWellnessMetric()` - Simula actualización
     - `deleteWellnessMetric()` - Simula eliminación
   - ✅ Agregado delay de 500ms en cada respuesta para simular latencia de red
   - ✅ Mantiene retrocompatibilidad - fácil cambiar de mock a API real

### 3. **Modificación: `app.routes.ts`**
   **Ubicación:** `src/app/app.routes.ts`
   
   **Cambios:**
   - ✅ Comentada la importación de `WellnessMetricPage`
   - ✅ Comentada la ruta `/wellness-metrics`
   - ✅ Agregados comentarios TODO para identificar donde descomentar

### 4. **Modificación: `vehicle-details-page.ts`**
   **Ubicación:** `src/app/vehiclemanagement/presentation/views/vehicle-details-page/vehicle-details-page.ts`
   
   **Cambios:**
   - ✅ Comentada la llamada a `navigateToMetrics()`
   - ✅ Agregado mensaje de consola informativo
   - ✅ Preserva el método para implementación futura

## 🎯 Estado de Implementación del Sprint

### ✅ Completado
- [x] Mock data para sensores IoT
- [x] Datos de temperatura, presión, impacto
- [x] Datos de calidad del aire (CO2, NH3, Benceno)
- [x] Datos de ubicación GPS
- [x] Servicio API preparado con mock data

### 🔄 Parcialmente Implementado / En Espera
- [ ] Pantalla de visualización de métricas (comentada temporalmente)
- [ ] Ruta `/wellness-metrics` (comentada temporalmente)
- [ ] Alertas visuales de temperatura, presión e impacto
- [ ] Integración real con backend IoT

### ⏳ Pendiente
- [ ] Conexión real al backend (cuando esté disponible)
- [ ] WebSocket/Real-time streaming de datos
- [ ] Persistencia en base de datos

## 🚀 Cómo Activar la Implementación Completa

Cuando el módulo `vehicle-wellness` esté completamente implementado y el backend esté listo:

### Paso 1: Cambiar el flag en `wellness-metric-api.service.ts`
```typescript
private USE_MOCK_DATA = false; // Cambiar a false
```

### Paso 2: Descomentar rutas en `app.routes.ts`
```typescript
// Descomentar la importación
import {WellnessMetricPage} from '@app/vehicle-wellness/presentation/views/wellness-metric-page/wellness-metric-page';

// Descomentar la ruta
{path: 'wellness-metrics', component: WellnessMetricPage, canActivate: [authenticationGuard] }
```

### Paso 3: Descomentar navegación en `vehicle-details-page.ts`
```typescript
navigateToMetrics() {
  if (this.vehicle?.id) {
    this.router.navigate(['/wellness-metrics'], {
      queryParams: {vehicleId: this.vehicle.id}
    });
  }
}
```

## 📊 Estructura de Datos de Mock

```typescript
{
  id: number;
  vehicleId: number;
  
  // Ubicación GPS
  latitude: number;
  longitude: number;
  
  // Calidad del Aire
  CO2Ppm: number;        // Dióxido de carbono (ppm)
  NH3Ppm: number;        // Amoniaco (ppm)
  BenzenePpm: number;    // Benceno (ppm)
  
  // Condiciones Ambientales
  temperatureCelsius: number;
  humidityPercentage: number;
  pressureHpa: number;   // Presión atmosférica
  
  // Estado
  impactDetected: boolean;
  registeredAt: Date;
}
```

## 📝 Notas de Desarrollo

- Los datos mock están generados con valores realistas para motocicletas en Cartagena, Colombia
- Las temperaturas reflejan condiciones de clima tropical (35-45°C)
- Hay un 20% de probabilidad de impacto detectado en datos aleatorios
- La presión simula valores atmosféricos estándar (~1013 hPa)
- Fácil de extender con más vehículos y registros históricos

## 🔗 Archivos Relacionados

| Archivo | Rol | Estado |
|---------|-----|--------|
| `wellness-metric-mock.data.ts` | Mock Data | ✅ Nuevo |
| `wellness-metric-api.service.ts` | API Service | ✅ Modificado |
| `metrics.store.ts` | Application Store | ✅ Funcional (usa API) |
| `wellness-metric.entity.ts` | Domain Model | ✅ Funcional |
| `wellness-metric.assembler.ts` | Infrastructure | ✅ Funcional |
| `wellness-metric-list.ts` | Presentation | 🔄 Comentada |
| `wellness-metric-page.ts` | View | 🔄 Comentada |
| `app.routes.ts` | Routing | 🔄 Ruta comentada |
| `vehicle-details-page.ts` | Navigation | 🔄 Navegación comentada |

