<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

// ===================== 配色方案 - 可自行修改 =====================
const THEME = {
  sidebarBg: '#1B1A57',
  pageBg: '#F5F3FD',
  cardBg: '#FFFFFF',
  accent: '#82BDA4',
  accentDark: '#5FA885',
  textPrimary: '#2D2D3A',
  textSecondary: '#6B6B80',
  textMuted: '#9B9BB0',
  textOnDark: '#FFFFFF',
  border: '#E8E4F0',
  borderDark: '#D0C8E8',
  shadow: 'rgba(27, 26, 87, 0.08)',
}

const TRIP_CONFIG = {
  short:  { label: '短途', maxDays: 2, color: { bg: 'rgba(130, 189, 164, 0.12)', border: '#82BDA4', text: '#5FA885' } },
  medium: { label: '中途', maxDays: 5, color: { bg: 'rgba(27, 26, 87, 0.08)', border: '#1B1A57', text: '#1B1A57' } },
  long:   { label: '长途', maxDays: Infinity, color: { bg: 'rgba(245, 166, 35, 0.10)', border: '#F5A623', text: '#C47D0A' } },
}

// ===================== 出差天数计算 =====================
const getTripDuration = (startDate, endDate) => dayjs(endDate).diff(dayjs(startDate), 'day') + 1
const getTripLevel = (startDate, endDate) => {
  const days = getTripDuration(startDate, endDate)
  if (days <= TRIP_CONFIG.short.maxDays) return 'short'
  if (days <= TRIP_CONFIG.medium.maxDays) return 'medium'
  return 'long'
}
const getColor = (startDate, endDate) => TRIP_CONFIG[getTripLevel(startDate, endDate)].color
const getDurationLabel = (startDate, endDate) => `${TRIP_CONFIG[getTripLevel(startDate, endDate)].label}${getTripDuration(startDate, endDate)}天`

// ===================== 数据 =====================
const visitors = ref([
  { id: 1, name: '张伟', company: '总公司', department: '技术部', position: '架构师',
    startDate: '2026-05-10', endDate: '2026-05-14', phone: '138xxxx0001', note: '系统架构升级项目' },
  { id: 2, name: '李娜', company: '总公司', department: '财务部', position: '财务经理',
    startDate: '2026-05-12', endDate: '2026-05-15', phone: '138xxxx0002', note: '季度审计' },
  { id: 3, name: '王强', company: '总公司', department: '市场部', position: '市场总监',
    startDate: '2026-05-05', endDate: '2026-05-08', phone: '138xxxx0003', note: '市场调研' },
  { id: 4, name: '刘洋', company: '总公司', department: '技术部', position: '高级工程师',
    startDate: '2026-05-20', endDate: '2026-05-25', phone: '138xxxx0004', note: 'ERP系统实施' },
  { id: 5, name: '陈静', company: '总公司', department: '人力资源', position: 'HR主管',
    startDate: '2026-05-18', endDate: '2026-05-19', phone: '138xxxx0005', note: '招聘面试' },
  { id: 6, name: '赵磊', company: '总公司', department: '技术部', position: '项目经理',
    startDate: '2026-05-22', endDate: '2026-05-27', phone: '138xxxx0006', note: '敏捷转型项目' },
  { id: 7, name: '周敏', company: '总公司', department: '市场部', position: '品牌经理',
    startDate: '2026-05-08', endDate: '2026-05-10', phone: '138xxxx0007', note: '品牌推广' },
  { id: 8, name: '吴昊', company: '总公司', department: '财务部', position: '会计',
    startDate: '2026-05-14', endDate: '2026-05-16', phone: '138xxxx0008', note: '税务筹划' },
  { id: 9, name: '孙丽', company: '总公司', department: '销售部', position: '销售总监',
    startDate: '2026-05-26', endDate: '2026-05-30', phone: '138xxxx0009', note: '客户洽谈' },
  { id: 10, name: '郑阳', company: '总公司', department: '技术部', position: 'DBA',
    startDate: '2026-05-11', endDate: '2026-05-13', phone: '138xxxx0010', note: '数据库优化' },
])

// ===================== 日历逻辑 =====================
const now = dayjs()
const selectedDate = ref(null)
const expandedDays = ref({})
const currentDate = ref(dayjs())

const calendarData = computed(() => {
  return Array.from({ length: 42 }, (_, i) => {
    const startOfMonth = currentDate.value.startOf('month')
    return startOfMonth.subtract(startOfMonth.day(), 'day').add(i, 'day')
  })
})

const getVisitorsByDay = (day) => visitors.value.filter(v =>
  day.isSameOrAfter(dayjs(v.startDate), 'day') && day.isSameOrBefore(dayjs(v.endDate), 'day')
)
const getVisitorCount = (day) => getVisitorsByDay(day).length
const isInRange = (day) => getVisitorCount(day) > 0
const isCurrentMonth = (day) => day.month() === currentDate.value.month()

const handleDayClick = (day) => {
  selectedDate.value = day.format('YYYY-MM-DD')
}

const prevMonth = () => { currentDate.value = currentDate.value.subtract(1, 'month') }
const nextMonth = () => { currentDate.value = currentDate.value.add(1, 'month') }
const goToday = () => { currentDate.value = dayjs() }

const toggleExpand = (dayStr, e) => {
  e.stopPropagation()
  expandedDays.value[dayStr] = !expandedDays.value[dayStr]
}

const headerTitle = computed(() => currentDate.value.format('YYYY年M月'))

// ===================== 侧边详情 =====================
const selectedDayVisitors = computed(() => {
  if (!selectedDate.value) return []
  return getVisitorsByDay(dayjs(selectedDate.value))
})
const closePanel = () => { selectedDate.value = null }
</script>

<template>
  <div class="calendar-wrapper">

    <!-- ===================== Header ===================== -->
    <header class="calendar-header">
      <div class="header-left">
        <div class="brand">
          <span class="brand-dot"></span>
          <span class="brand-text">Visitor Calendar</span>
        </div>
        <h1 class="month-title">{{ headerTitle }}</h1>
      </div>

      <div class="header-right">
        <el-button text @click="goToday">今天</el-button>
        <el-button text @click="prevMonth">
          <el-icon><ArrowLeft /></el-icon>
        </el-button>
        <el-button text @click="nextMonth">
          <el-icon><ArrowRight /></el-icon>
        </el-button>
      </div>
    </header>

    <!-- ===================== Month View ===================== -->
    <div class="calendar-grid">
      <div class="weekday-row">
        <span v-for="(d, i) in ['日','一','二','三','四','五','六']" :key="i" class="weekday-label">星期{{ d }}</span>
      </div>
      <div class="days-grid">
        <div
          v-for="(day, idx) in calendarData"
          :key="idx"
          class="day-cell"
          :class="{
            'is-today': day.isSame(now, 'day'),
            'is-selected': day.format('YYYY-MM-DD') === selectedDate,
            'is-current-month': isCurrentMonth(day),
            'has-visitors': isInRange(day),
          }"
          @click="handleDayClick(day)"
        >
          <span class="day-number" :class="{ 'is-today': day.isSame(now, 'day') }">{{ day.date() }}</span>

          <div v-if="isInRange(day)" class="visitor-list">
            <template v-for="(visitor, vi) in (expandedDays[day.format('YYYY-MM-DD')] ? getVisitorsByDay(day) : getVisitorsByDay(day).slice(0, 2))" :key="visitor.id">
              <div
                class="visitor-chip"
                :style="{
                  background: getColor(visitor.startDate, visitor.endDate).bg,
                  borderColor: getColor(visitor.startDate, visitor.endDate).border,
                }"
                :title="`${visitor.name} · ${getDurationLabel(visitor.startDate, visitor.endDate)}`"
              >
                <span class="visitor-name" :style="{ color: getColor(visitor.startDate, visitor.endDate).text }">{{ visitor.name }}</span>
                <span
                  class="visitor-duration"
                  :style="{ background: getColor(visitor.startDate, visitor.endDate).border + '22', color: getColor(visitor.startDate, visitor.endDate).text }"
                >
                  {{ getDurationLabel(visitor.startDate, visitor.endDate) }}
                </span>
              </div>
            </template>

            <div
              v-if="getVisitorCount(day) > 2 && !expandedDays[day.format('YYYY-MM-DD')]"
              class="more-count"
              @click="toggleExpand(day.format('YYYY-MM-DD'), $event)"
            >+{{ getVisitorCount(day) - 2 }} 人</div>
            <div
              v-if="getVisitorCount(day) > 2 && expandedDays[day.format('YYYY-MM-DD')]"
              class="collapse-btn"
              @click="toggleExpand(day.format('YYYY-MM-DD'), $event)"
            >收起</div>
          </div>

          <template v-if="isInRange(day)">
            <div
              v-for="visitor in getVisitorsByDay(day).filter(v => v.startDate === day.format('YYYY-MM-DD'))"
              :key="'s-' + visitor.id"
              class="date-indicator start"
              :style="{ background: getColor(visitor.startDate, visitor.endDate).border }"
            >入</div>
            <div
              v-for="visitor in getVisitorsByDay(day).filter(v => v.endDate === day.format('YYYY-MM-DD'))"
              :key="'e-' + visitor.id"
              class="date-indicator end"
              :style="{ background: getColor(visitor.startDate, visitor.endDate).border }"
            >离</div>
          </template>
        </div>
      </div>
    </div>

    <!-- ===================== Stats Bar ===================== -->
    <div class="stats-bar">
      <div class="stat-item">
        <span class="stat-label">本月接待</span>
        <span class="stat-value">{{ visitors.length }} 人次</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">当前在岗</span>
        <span class="stat-value">{{ visitors.filter(v => now.isSameOrAfter(dayjs(v.startDate), 'day') && now.isSameOrBefore(dayjs(v.endDate), 'day')).length }} 人</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">总公司来访</span>
        <span class="stat-value">{{ visitors.filter(v => v.company === '总公司').length }} 人</span>
      </div>
      <div class="dept-legend">
        <span v-for="(config, key) in TRIP_CONFIG" :key="key" class="legend-item">
          <span class="legend-dot" :style="{ background: config.color.border }"></span>
          {{ config.label }}
          ({{ key === 'short' ? `1-${TRIP_CONFIG.short.maxDays}` : key === 'medium' ? `${TRIP_CONFIG.short.maxDays + 1}-${TRIP_CONFIG.medium.maxDays}` : `>${TRIP_CONFIG.medium.maxDays}` }}天)
        </span>
      </div>
    </div>

    <!-- ===================== Detail Panel ===================== -->
    <Transition name="panel">
      <div v-if="selectedDate" class="detail-panel">
        <div class="panel-header">
          <div class="panel-title">
            <h2>{{ dayjs(selectedDate).format('M月D日') }}</h2>
            <span class="panel-weekday">星期{{ ['日','一','二','三','四','五','六'][dayjs(selectedDate).day()] }}</span>
          </div>
          <el-button text @click="closePanel">
            <el-icon><Close /></el-icon>
          </el-button>
        </div>

        <div class="panel-body">
          <template v-if="selectedDayVisitors.length > 0">
            <div class="visitor-count-row">
              <span class="visitor-count-num" :style="{ color: THEME.accent }">{{ selectedDayVisitors.length }}</span>
              <span class="visitor-count-label">位出差人员</span>
            </div>

            <div v-for="visitor in selectedDayVisitors" :key="visitor.id" class="visitor-card">
              <div class="card-left">
                <div
                  class="card-avatar"
                  :style="{ background: getColor(visitor.startDate, visitor.endDate).bg, borderColor: getColor(visitor.startDate, visitor.endDate).border + '60', color: getColor(visitor.startDate, visitor.endDate).text }"
                >
                  {{ visitor.name.slice(0, 1) }}
                </div>
                <div class="card-info">
                  <div class="card-name">{{ visitor.name }}</div>
                  <div class="card-dept">{{ visitor.department }} · {{ visitor.position }}</div>
                </div>
              </div>
              <div class="card-right">
                <div
                  class="card-duration"
                  :style="{ background: getColor(visitor.startDate, visitor.endDate).bg, borderColor: getColor(visitor.startDate, visitor.endDate).border + '60', color: getColor(visitor.startDate, visitor.endDate).text }"
                >
                  {{ getDurationLabel(visitor.startDate, visitor.endDate) }}
                </div>
              </div>
            </div>

            <div class="card-detail-divider"></div>

            <div v-for="visitor in selectedDayVisitors" :key="'detail-' + visitor.id" class="visitor-detail">
              <div class="visitor-detail-row">
                <span class="detail-label">公司</span>
                <span class="detail-value">{{ visitor.company }}</span>
              </div>
              <div class="visitor-detail-row">
                <span class="detail-label">出差时间</span>
                <span class="detail-value">{{ visitor.startDate }} ~ {{ visitor.endDate }}</span>
              </div>
              <div class="visitor-detail-row">
                <span class="detail-label">联系电话</span>
                <span class="detail-value">{{ visitor.phone }}</span>
              </div>
              <div class="visitor-detail-row">
                <span class="detail-label">出差事由</span>
                <span class="detail-value">{{ visitor.note }}</span>
              </div>
            </div>
          </template>
          <div v-else class="empty-state">
            <el-icon class="empty-icon" :style="{ color: THEME.accent }"><Calendar /></el-icon>
            <p>当天无出差人员</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* ===================== Layout ===================== */
.calendar-wrapper {
  min-height: 100vh;
  background: v-bind('THEME.pageBg');
  color: v-bind('THEME.textPrimary');
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  flex-direction: column;
  padding: 0 24px 24px;
}

/* ===================== Header ===================== */
.calendar-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 0 16px;
  border-bottom: 2px solid v-bind('THEME.border');
  gap: 16px;
  background: v-bind('THEME.cardBg');
}

.header-left { display: flex; align-items: center; gap: 24px; }
.brand { display: flex; align-items: center; gap: 8px; }
.brand-dot {
  width: 8px; height: 8px;
  background: v-bind('THEME.accent');
  border-radius: 50%;
  box-shadow: 0 0 8px v-bind('THEME.accent + "60"');
}
.brand-text {
  font-size: 12px; font-weight: 600;
  color: v-bind('THEME.textMuted');
  letter-spacing: 1px; text-transform: uppercase;
}
.month-title {
  font-size: 24px; font-weight: 700;
  color: v-bind('THEME.textPrimary');
  letter-spacing: -0.5px;
}

.header-right { display: flex; align-items: center; gap: 4px; }
.header-right .el-button { color: v-bind('THEME.textSecondary') !important; font-size: 14px; }
.header-right .el-button:hover { color: v-bind('THEME.accent') !important; }

/* ===================== Calendar Grid ===================== */
.calendar-grid { flex: 1; padding-top: 20px; }

.weekday-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
}

.weekday-label {
  text-align: center;
  font-size: 11px; font-weight: 600;
  color: v-bind('THEME.textMuted');
  letter-spacing: 0.5px;
  padding: 8px 0;
  text-transform: uppercase;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1.5px solid v-bind('THEME.border');
  border-radius: 14px;
  overflow: hidden;
  background: v-bind('THEME.cardBg');
  box-shadow: 0 2px 16px v-bind('THEME.shadow');
}

.day-cell {
  min-height: 130px;
  padding: 8px;
  background: v-bind('THEME.cardBg');
  border-right: 1px solid v-bind('THEME.border');
  border-bottom: 1px solid v-bind('THEME.border');
  position: relative;
  cursor: pointer;
  transition: background 0.15s;
}

.day-cell:hover { background: v-bind('THEME.pageBg'); }
.day-cell:nth-child(7n) { border-right: none; }
.day-cell:nth-last-child(-n+7) { border-bottom: none; }
.day-cell:not(.is-current-month) { background: v-bind('THEME.pageBg'); }
.day-cell.is-today { background: v-bind('THEME.accent + "0D"'); }
.day-cell.is-selected {
  background: v-bind('THEME.accent + "18"') !important;
  box-shadow: inset 0 0 0 2px v-bind('THEME.accent + "50"');
}

.day-number {
  font-size: 12px; font-weight: 500;
  color: v-bind('THEME.textMuted');
  display: block;
  margin-bottom: 6px;
  text-align: right;
}
.is-current-month .day-number { color: v-bind('THEME.textSecondary'); }

.day-number.is-today {
  width: 24px; height: 24px; line-height: 24px;
  text-align: center;
  background: v-bind('THEME.accent');
  color: v-bind('THEME.textOnDark') !important;
  border-radius: 50%; font-weight: 700;
  margin-top: -2px; margin-right: -2px;
  display: inline-flex; align-items: center; justify-content: center;
}

/* ===================== Visitor Chips ===================== */
.visitor-list { display: flex; flex-direction: column; gap: 3px; }

.visitor-chip {
  display: flex; align-items: center; gap: 3px;
  padding: 3px 6px;
  border-radius: 6px;
  border: 1px solid;
  font-size: 11px;
  cursor: pointer;
  transition: opacity 0.15s;
  overflow: hidden;
}
.visitor-chip:hover { opacity: 0.85; }

.visitor-name {
  font-weight: 600;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  flex: 1; min-width: 0;
}

.visitor-duration {
  font-size: 9px; font-weight: 600;
  padding: 1px 4px;
  border-radius: 4px;
  flex-shrink: 0; white-space: nowrap;
}

.more-count {
  font-size: 10px; color: v-bind('THEME.accent'); font-weight: 600;
  cursor: pointer; padding: 2px 4px;
  border-radius: 4px; background: v-bind('THEME.accent + "12"');
  text-align: center;
}
.more-count:hover { background: v-bind('THEME.accent + "20"'); }

.collapse-btn {
  font-size: 10px; color: v-bind('THEME.textMuted');
  cursor: pointer; padding: 2px 4px; text-align: center;
}
.collapse-btn:hover { color: v-bind('THEME.textSecondary'); }

/* ===================== Date Indicators ===================== */
.date-indicator {
  position: absolute; bottom: 4px;
  font-size: 9px; font-weight: 700;
  padding: 1px 5px; border-radius: 4px;
  color: #fff; letter-spacing: 0.3px;
}
.date-indicator.start { left: 8px; }
.date-indicator.end { right: 8px; }

/* ===================== Stats Bar ===================== */
.stats-bar {
  display: flex; align-items: center; gap: 32px;
  padding: 16px 20px; margin-top: 16px;
  background: v-bind('THEME.cardBg');
  border: 1.5px solid v-bind('THEME.border');
  border-radius: 12px;
  box-shadow: 0 2px 12px v-bind('THEME.shadow');
}

.stat-item { display: flex; flex-direction: column; gap: 2px; }
.stat-label { font-size: 11px; color: v-bind('THEME.textMuted'); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
.stat-value { font-size: 18px; font-weight: 700; color: v-bind('THEME.textPrimary'); }

.dept-legend { display: flex; gap: 16px; margin-left: auto; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: v-bind('THEME.textSecondary'); }
.legend-dot { width: 8px; height: 8px; border-radius: 2px; }

/* ===================== Detail Panel ===================== */
.detail-panel {
  position: fixed; right: 0; top: 0; bottom: 0;
  width: 400px;
  background: v-bind('THEME.cardBg');
  border-left: 1.5px solid v-bind('THEME.border');
  z-index: 1000;
  display: flex; flex-direction: column;
  box-shadow: -20px 0 60px v-bind('THEME.shadow');
}

.panel-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px; border-bottom: 1.5px solid v-bind('THEME.border');
}

.panel-title { display: flex; align-items: baseline; gap: 8px; }
.panel-title h2 { font-size: 20px; font-weight: 700; color: v-bind('THEME.textPrimary'); }
.panel-weekday { font-size: 13px; color: v-bind('THEME.textMuted'); }
.panel-header .el-button { color: v-bind('THEME.textSecondary') !important; font-size: 16px; }
.panel-header .el-button:hover { color: v-bind('THEME.accent') !important; }

.panel-body {
  flex: 1; overflow-y: auto;
  padding: 20px 24px;
  display: flex; flex-direction: column; gap: 12px;
}

/* ===================== Visitor Summary in Panel ===================== */
.visitor-count-row {
  display: flex; align-items: baseline; gap: 6px;
  padding: 12px 16px;
  background: v-bind('THEME.pageBg');
  border-radius: 10px;
}

.visitor-count-num { font-size: 28px; font-weight: 700; }
.visitor-count-label { font-size: 14px; color: v-bind('THEME.textSecondary'); }

/* ===================== Visitor Cards ===================== */
.visitor-card {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px;
  background: v-bind('THEME.pageBg');
  border: 1.5px solid v-bind('THEME.border');
  border-radius: 12px;
  transition: border-color 0.15s;
}
.visitor-card:hover { border-color: v-bind('THEME.accent + "60"'); }

.card-left { display: flex; align-items: center; gap: 12px; }
.card-avatar {
  width: 44px; height: 44px;
  border-radius: 10px; border: 1.5px solid;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; font-weight: 700; flex-shrink: 0;
}
.card-info { display: flex; flex-direction: column; gap: 3px; }
.card-name { font-size: 15px; font-weight: 600; color: v-bind('THEME.textPrimary'); }
.card-dept { font-size: 12px; color: v-bind('THEME.textSecondary'); }

.card-right { display: flex; align-items: center; }
.card-duration {
  font-size: 12px; font-weight: 600;
  padding: 4px 10px; border-radius: 6px; border: 1px solid;
}

/* ===================== Detail Divider ===================== */
.card-detail-divider {
  height: 1px;
  background: v-bind('THEME.border');
  margin: 4px 0;
}

/* ===================== Visitor Detail ===================== */
.visitor-detail {
  padding: 14px 16px;
  background: v-bind('THEME.pageBg');
  border: 1.5px solid v-bind('THEME.border');
  border-radius: 12px;
}

.visitor-detail-row {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 5px 0;
  border-bottom: 1px solid v-bind('THEME.border');
}
.visitor-detail-row:last-child { border-bottom: none; }

.detail-label {
  font-size: 11px; font-weight: 600;
  color: v-bind('THEME.textMuted');
  text-transform: uppercase; letter-spacing: 0.5px;
  min-width: 70px;
  padding-top: 1px;
}
.detail-value { font-size: 13px; color: v-bind('THEME.textPrimary'); flex: 1; }

/* ===================== Empty State ===================== */
.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 200px; gap: 12px; color: v-bind('THEME.textMuted');
}
.empty-icon { font-size: 48px; }

/* ===================== Transitions ===================== */
.panel-enter-active, .panel-leave-active { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.panel-enter-from, .panel-leave-to { transform: translateX(100%); }
</style>