<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

// ===================== 配置区 - 可自行修改 =====================
const TRIP_CONFIG = {
  short: { label: '短途', maxDays: 2, color: { bg: 'rgba(39, 166, 68, 0.12)', border: '#27a644', text: '#4ade80' } },
  medium: { label: '中途', maxDays: 5, color: { bg: 'rgba(94, 106, 210, 0.15)', border: '#5e6ad2', text: '#828fff' } },
  long: { label: '长途', maxDays: Infinity, color: { bg: 'rgba(249, 115, 22, 0.12)', border: '#f97316', text: '#fb923c' } },
}

// ===================== 出差天数计算 =====================
const getTripDuration = (startDate, endDate) => {
  return dayjs(endDate).diff(dayjs(startDate), 'day') + 1
}

const getTripLevel = (startDate, endDate) => {
  const days = getTripDuration(startDate, endDate)
  if (days <= TRIP_CONFIG.short.maxDays) return 'short'
  if (days <= TRIP_CONFIG.medium.maxDays) return 'medium'
  return 'long'
}

const getColor = (startDate, endDate) => {
  const level = getTripLevel(startDate, endDate)
  return TRIP_CONFIG[level].color
}

const getDurationLabel = (startDate, endDate) => {
  const level = getTripLevel(startDate, endDate)
  const days = getTripDuration(startDate, endDate)
  return `${TRIP_CONFIG[level].label}${days}天`
}

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

// ===================== View Mode =====================
const viewMode = ref('month')
const now = dayjs()
const selectedDate = ref(now.format('YYYY-MM-DD'))
const expandedDays = ref({})

// ===================== Calendar Logic =====================
const currentDate = ref(dayjs())

const calendarData = computed(() => {
  return Array.from({ length: 42 }, (_, i) => {
    const startOfMonth = currentDate.value.startOf('month')
    const dayOfWeek = startOfMonth.day()
    return startOfMonth.subtract(dayOfWeek, 'day').add(i, 'day')
  })
})

const weekData = computed(() => {
  const startOfWeek = currentDate.value.startOf('week')
  return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'))
})

const getVisitorsByDay = (day) => {
  const dayStr = day.format('YYYY-MM-DD')
  return visitors.value.filter(v =>
    day.isSameOrAfter(dayjs(v.startDate), 'day') && day.isSameOrBefore(dayjs(v.endDate), 'day')
  )
}

const getVisitorCount = (day) => getVisitorsByDay(day).length
const isInRange = (day) => getVisitorCount(day) > 0
const isCurrentMonth = (day) => day.month() === currentDate.value.month()

const handleDayClick = (day) => {
  selectedDate.value = day.format('YYYY-MM-DD')
  if (viewMode.value !== 'day') viewMode.value = 'day'
}

const prevMonth = () => { currentDate.value = currentDate.value.subtract(1, 'month') }
const nextMonth = () => { currentDate.value = currentDate.value.add(1, 'month') }
const prevWeek = () => { currentDate.value = currentDate.value.subtract(1, 'week') }
const nextWeek = () => { currentDate.value = currentDate.value.add(1, 'week') }
const prevDay = () => { currentDate.value = currentDate.value.subtract(1, 'day') }
const nextDay = () => { currentDate.value = currentDate.value.add(1, 'day') }
const goToday = () => { currentDate.value = dayjs(); selectedDate.value = dayjs().format('YYYY-MM-DD') }

const toggleExpand = (dayStr, e) => {
  e.stopPropagation()
  expandedDays.value[dayStr] = !expandedDays.value[dayStr]
}

const headerTitle = computed(() => {
  if (viewMode.value === 'month') return currentDate.value.format('YYYY年M月')
  if (viewMode.value === 'week') {
    const start = currentDate.value.startOf('week')
    const end = start.add(6, 'day')
    return start.format('M月D日') + ' - ' + end.format('M月D日')
  }
  return currentDate.value.format('YYYY年M月D日')
})

const selectedDayVisitors = computed(() => getVisitorsByDay(dayjs(selectedDate.value)))
const closePanel = () => { selectedDate.value = null }

// ===================== Init =====================
const todayStr = now.format('YYYY-MM-DD')
expandedDays.value[todayStr] = true
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

      <div class="header-center">
        <div class="view-toggle">
          <button
            v-for="mode in ['month', 'week', 'day']"
            :key="mode"
            class="view-btn"
            :class="{ active: viewMode === mode }"
            @click="viewMode = mode; selectedDate = currentDate.format('YYYY-MM-DD')"
          >
            {{ mode === 'month' ? '月' : mode === 'week' ? '周' : '日' }}
          </button>
        </div>
      </div>

      <div class="header-right">
        <el-button text @click="goToday">今天</el-button>
        <el-button text @click="viewMode === 'month' ? prevMonth() : viewMode === 'week' ? prevWeek() : prevDay()">
          <el-icon><ArrowLeft /></el-icon>
        </el-button>
        <el-button text @click="viewMode === 'month' ? nextMonth() : viewMode === 'week' ? nextWeek() : nextDay()">
          <el-icon><ArrowRight /></el-icon>
        </el-button>
      </div>
    </header>

    <!-- ===================== Month View ===================== -->
    <div v-if="viewMode === 'month'" class="calendar-grid">
      <div class="weekday-row">
        <span v-for="(day, i) in ['日','一','二','三','四','五','六']" :key="i" class="weekday-label">
          星期{{ day }}
        </span>
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
          <span class="day-number" :class="{ 'is-today': day.isSame(now, 'day') }">
            {{ day.date() }}
          </span>

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
                <span class="visitor-name" :style="{ color: getColor(visitor.startDate, visitor.endDate).text }">
                  {{ visitor.name }}
                </span>
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
            >
              <span>+{{ getVisitorCount(day) - 2 }} 人</span>
            </div>
            <div
              v-if="getVisitorCount(day) > 2 && expandedDays[day.format('YYYY-MM-DD')]"
              class="collapse-btn"
              @click="toggleExpand(day.format('YYYY-MM-DD'), $event)"
            >
              <span>收起</span>
            </div>
          </div>

          <template v-if="isInRange(day)">
            <div
              v-for="visitor in getVisitorsByDay(day).filter(v => v.startDate === day.format('YYYY-MM-DD'))"
              :key="'s-' + visitor.id"
              class="date-indicator start"
              :style="{ background: getColor(visitor.startDate, visitor.endDate).border }"
              title="入住"
            >
              <span>入</span>
            </div>
            <div
              v-for="visitor in getVisitorsByDay(day).filter(v => v.endDate === day.format('YYYY-MM-DD'))"
              :key="'e-' + visitor.id"
              class="date-indicator end"
              :style="{ background: getColor(visitor.startDate, visitor.endDate).border }"
              title="离开"
            >
              <span>离</span>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- ===================== Week View ===================== -->
    <div v-else-if="viewMode === 'week'" class="calendar-grid week-view">
      <div class="weekday-row">
        <span v-for="(day, i) in ['日','一','二','三','四','五','六']" :key="i" class="weekday-label">
          星期{{ day }}
        </span>
      </div>
      <div class="days-grid week-grid">
        <div
          v-for="(day, idx) in weekData"
          :key="idx"
          class="day-cell week-cell"
          :class="{
            'is-today': day.isSame(now, 'day'),
            'is-selected': day.format('YYYY-MM-DD') === selectedDate,
            'has-visitors': isInRange(day),
          }"
          @click="handleDayClick(day)"
        >
          <div class="week-header">
            <span class="week-month">{{ day.month() + 1 }}月</span>
            <span class="day-number" :class="{ 'is-today': day.isSame(now, 'day') }">
              {{ day.date() }}
            </span>
          </div>

          <div v-if="isInRange(day)" class="visitor-list">
            <template v-for="(visitor, vi) in (expandedDays[day.format('YYYY-MM-DD')] ? getVisitorsByDay(day) : getVisitorsByDay(day).slice(0, 3))" :key="visitor.id">
              <div
                class="visitor-chip"
                :style="{
                  background: getColor(visitor.startDate, visitor.endDate).bg,
                  borderColor: getColor(visitor.startDate, visitor.endDate).border,
                }"
              >
                <span class="visitor-name" :style="{ color: getColor(visitor.startDate, visitor.endDate).text }">
                  {{ visitor.name }}
                </span>
                <span
                  class="visitor-duration"
                  :style="{ background: getColor(visitor.startDate, visitor.endDate).border + '22', color: getColor(visitor.startDate, visitor.endDate).text }"
                >
                  {{ getDurationLabel(visitor.startDate, visitor.endDate) }}
                </span>
              </div>
            </template>

            <div
              v-if="getVisitorCount(day) > 3 && !expandedDays[day.format('YYYY-MM-DD')]"
              class="more-count"
              @click="toggleExpand(day.format('YYYY-MM-DD'), $event)"
            >
              <span>+{{ getVisitorCount(day) - 3 }} 人</span>
            </div>
            <div
              v-if="getVisitorCount(day) > 3 && expandedDays[day.format('YYYY-MM-DD')]"
              class="collapse-btn"
              @click="toggleExpand(day.format('YYYY-MM-DD'), $event)"
            >
              <span>收起</span>
            </div>
          </div>

          <template v-if="isInRange(day)">
            <div
              v-for="visitor in getVisitorsByDay(day).filter(v => v.startDate === day.format('YYYY-MM-DD'))"
              :key="'s-' + visitor.id"
              class="date-indicator start"
              :style="{ background: getColor(visitor.startDate, visitor.endDate).border }"
            >
              <span>入</span>
            </div>
            <div
              v-for="visitor in getVisitorsByDay(day).filter(v => v.endDate === day.format('YYYY-MM-DD'))"
              :key="'e-' + visitor.id"
              class="date-indicator end"
              :style="{ background: getColor(visitor.startDate, visitor.endDate).border }"
            >
              <span>离</span>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- ===================== Day View ===================== -->
    <div v-else class="calendar-grid day-view">
      <div class="day-detail-grid">
        <div class="day-header-card">
          <div class="day-header-left">
            <div class="day-big-number">{{ currentDate.format('D') }}</div>
            <div class="day-info">
              <div class="day-weekday">{{ ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][currentDate.day()] }}</div>
              <div class="day-month-text">{{ currentDate.format('YYYY年M月') }}</div>
            </div>
          </div>
          <div class="day-header-right">
            <div class="visitor-count-badge">
              <span class="count-num">{{ getVisitorCount(currentDate) }}</span>
              <span class="count-text">位出差人员</span>
            </div>
          </div>
        </div>

        <div class="day-visitors-list">
          <template v-if="getVisitorCount(currentDate) > 0">
            <div
              v-for="visitor in getVisitorsByDay(currentDate)"
              :key="visitor.id"
              class="visitor-full-card"
            >
              <div
                class="visitor-full-left"
                :style="{ borderColor: getColor(visitor.startDate, visitor.endDate).border }"
              >
                <div
                  class="visitor-avatar-large"
                  :style="{ background: getColor(visitor.startDate, visitor.endDate).bg, color: getColor(visitor.startDate, visitor.endDate).text, borderColor: getColor(visitor.startDate, visitor.endDate).border }"
                >
                  {{ visitor.name.slice(0, 1) }}
                </div>
                <div class="visitor-full-info">
                  <div class="visitor-full-name">{{ visitor.name }}</div>
                  <div class="visitor-full-dept">
                    {{ visitor.department }} · {{ visitor.position }}
                  </div>
                </div>
              </div>
              <div class="visitor-full-right">
                <div class="visitor-company-tag">{{ visitor.company }}</div>
                <div
                  class="visitor-duration-tag"
                  :style="{ background: getColor(visitor.startDate, visitor.endDate).bg, borderColor: getColor(visitor.startDate, visitor.endDate).border, color: getColor(visitor.startDate, visitor.endDate).text }"
                >
                  {{ getDurationLabel(visitor.startDate, visitor.endDate) }}
                </div>
                <div class="visitor-dates">
                  <span class="date-value">{{ visitor.startDate }} ~ {{ visitor.endDate }}</span>
                </div>
                <div class="visitor-note">{{ visitor.note }}</div>
              </div>
            </div>
          </template>
          <div v-else class="day-empty-state">
            <el-icon class="empty-icon"><Calendar /></el-icon>
            <p>当天无出差人员</p>
          </div>
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
          {{ config.label }} ({{ key === 'short' ? `1-${TRIP_CONFIG.short.maxDays}` : key === 'medium' ? `${TRIP_CONFIG.short.maxDays + 1}-${TRIP_CONFIG.medium.maxDays}` : `>${TRIP_CONFIG.medium.maxDays}` }}天)
        </span>
      </div>
    </div>

    <!-- ===================== Detail Panel ===================== -->
    <Transition name="panel">
      <div v-if="selectedDate && viewMode !== 'day'" class="detail-panel">
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
            <div v-for="visitor in selectedDayVisitors" :key="visitor.id" class="visitor-card">
              <div class="card-left">
                <div
                  class="card-avatar"
                  :style="{ background: getColor(visitor.startDate, visitor.endDate).bg, borderColor: getColor(visitor.startDate, visitor.endDate).border, color: getColor(visitor.startDate, visitor.endDate).text }"
                >
                  {{ visitor.name.slice(0, 1) }}
                </div>
                <div class="card-info">
                  <div class="card-name">{{ visitor.name }}</div>
                  <div class="card-dept">{{ visitor.department }} · {{ visitor.position }}</div>
                </div>
              </div>
              <div class="card-right">
                <div class="card-company">{{ visitor.company }}</div>
                <div
                  class="card-duration"
                  :style="{ color: getColor(visitor.startDate, visitor.endDate).text }"
                >
                  {{ getDurationLabel(visitor.startDate, visitor.endDate) }}
                </div>
                <div class="card-dates">{{ visitor.startDate }} ~ {{ visitor.endDate }}</div>
              </div>
            </div>
          </template>
          <div v-else class="empty-state">
            <el-icon class="empty-icon"><Calendar /></el-icon>
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
  background: #010102;
  color: #f7f8f8;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  flex-direction: column;
  padding: 0 24px 24px;
}

/* ===================== Header ===================== */
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 16px;
  border-bottom: 1px solid #23252a;
  gap: 16px;
}

.header-left { display: flex; align-items: center; gap: 24px; }
.brand { display: flex; align-items: center; gap: 8px; }
.brand-dot {
  width: 8px; height: 8px;
  background: #5e6ad2; border-radius: 50%;
  box-shadow: 0 0 8px #5e6ad280;
}
.brand-text {
  font-size: 12px; font-weight: 600; color: #8a8f98;
  letter-spacing: 1px; text-transform: uppercase;
}
.month-title { font-size: 24px; font-weight: 700; color: #f7f8f8; letter-spacing: -0.5px; }

.header-center { display: flex; align-items: center; justify-content: center; flex: 1; }

.view-toggle {
  display: flex;
  background: #141516;
  border: 1px solid #34343a;
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}

.view-btn {
  padding: 6px 18px;
  font-size: 13px; font-weight: 600;
  color: #8a8f98;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}

.view-btn:hover { color: #f7f8f8; }
.view-btn.active { background: #5e6ad2; color: #fff; }

.header-right { display: flex; align-items: center; gap: 4px; }
.header-right .el-button { color: #8a8f98 !important; font-size: 14px; }
.header-right .el-button:hover { color: #f7f8f8 !important; }

/* ===================== Calendar Grid ===================== */
.calendar-grid { flex: 1; padding-top: 16px; }

.weekday-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
}

.weekday-label {
  text-align: center;
  font-size: 11px; font-weight: 600;
  color: #62666d;
  letter-spacing: 0.5px;
  padding: 8px 0;
  text-transform: uppercase;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid #23252a;
  border-radius: 12px;
  overflow: hidden;
}

.day-cell {
  min-height: 120px;
  padding: 8px;
  background: #010102;
  border-right: 1px solid #23252a;
  border-bottom: 1px solid #23252a;
  position: relative;
  cursor: pointer;
  transition: background 0.15s;
}

.day-cell:hover { background: #0f1011; }
.day-cell:nth-child(7n) { border-right: none; }
.day-cell:nth-last-child(-n+7) { border-bottom: none; }
.day-cell:not(.is-current-month) { background: #0a0a0d; }
.day-cell.is-today { background: rgba(94, 106, 210, 0.06); }
.day-cell.is-selected { background: rgba(94, 106, 210, 0.12) !important; box-shadow: inset 0 0 0 1px #5e6ad240; }

.day-number {
  font-size: 12px; font-weight: 500;
  color: #62666d;
  display: block;
  margin-bottom: 6px;
  text-align: right;
}
.is-current-month .day-number { color: #8a8f98; }
.day-number.is-today {
  width: 22px; height: 22px; line-height: 22px;
  text-align: center;
  background: #5e6ad2; color: #fff !important;
  border-radius: 50%; font-weight: 700;
  margin-top: -2px; margin-right: -2px;
}

/* ===================== Visitor Chips ===================== */
.visitor-list { display: flex; flex-direction: column; gap: 3px; }

.visitor-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  border-radius: 5px;
  border: 1px solid;
  font-size: 11px;
  cursor: pointer;
  transition: opacity 0.15s;
  overflow: hidden;
}
.visitor-chip:hover { opacity: 0.85; }

.visitor-name {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}

.visitor-duration {
  font-size: 9px; font-weight: 600;
  padding: 1px 4px;
  border-radius: 3px;
  flex-shrink: 0;
  white-space: nowrap;
}

.more-count {
  font-size: 10px; color: #5e6ad2; font-weight: 600;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  background: rgba(94, 106, 210, 0.1);
  text-align: center;
}
.more-count:hover { background: rgba(94, 106, 210, 0.2); }

.collapse-btn {
  font-size: 10px; color: #62666d;
  cursor: pointer; padding: 2px 4px; text-align: center;
}
.collapse-btn:hover { color: #8a8f98; }

/* ===================== Date Indicators ===================== */
.date-indicator {
  position: absolute;
  bottom: 4px;
  font-size: 9px; font-weight: 700;
  padding: 1px 5px;
  border-radius: 3px;
  color: #fff;
  letter-spacing: 0.3px;
}
.date-indicator.start { left: 8px; }
.date-indicator.end { right: 8px; }

/* ===================== Week View ===================== */
.week-grid { grid-template-columns: repeat(7, 1fr); }
.week-cell { min-height: 200px; }
.week-header { display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px; }
.week-month { font-size: 10px; color: #62666d; font-weight: 500; }

/* ===================== Day View ===================== */
.day-view { padding-top: 24px; }
.day-detail-grid { display: flex; flex-direction: column; gap: 16px; max-width: 800px; margin: 0 auto; }

.day-header-card {
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 28px;
  background: #0f1011;
  border: 1px solid #23252a;
  border-radius: 14px;
}

.day-header-left { display: flex; align-items: center; gap: 20px; }
.day-big-number { font-size: 56px; font-weight: 700; color: #5e6ad2; line-height: 1; letter-spacing: -2px; }
.day-info { display: flex; flex-direction: column; gap: 4px; }
.day-weekday { font-size: 18px; font-weight: 600; color: #f7f8f8; }
.day-month-text { font-size: 13px; color: #62666d; }
.day-header-right { display: flex; align-items: center; }

.visitor-count-badge {
  display: flex; flex-direction: column; align-items: center;
  padding: 12px 20px;
  background: rgba(94, 106, 210, 0.1);
  border: 1px solid #5e6ad240;
  border-radius: 10px;
}
.count-num { font-size: 28px; font-weight: 700; color: #5e6ad2; }
.count-text { font-size: 12px; color: #8a8f98; }

.day-visitors-list { display: flex; flex-direction: column; gap: 10px; }

.visitor-full-card {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px;
  background: #0f1011;
  border: 1px solid #23252a;
  border-radius: 12px;
  transition: border-color 0.15s;
}
.visitor-full-card:hover { border-color: #34343a; }

.visitor-full-left {
  display: flex; align-items: center; gap: 14px;
  border-left: 3px solid;
  padding-left: 14px;
}

.visitor-avatar-large {
  width: 48px; height: 48px;
  border-radius: 12px; border: 1px solid;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; font-weight: 700;
  flex-shrink: 0;
}

.visitor-full-info { display: flex; flex-direction: column; gap: 3px; }
.visitor-full-name { font-size: 16px; font-weight: 600; color: #f7f8f8; }
.visitor-full-dept { font-size: 13px; color: #8a8f98; }

.visitor-full-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }

.visitor-company-tag {
  font-size: 12px; color: #8a8f98;
  background: #18191a;
  padding: 2px 10px;
  border-radius: 4px;
}

.visitor-duration-tag {
  font-size: 12px; font-weight: 600;
  padding: 3px 10px;
  border-radius: 6px;
  border: 1px solid;
}

.visitor-dates { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
.date-value { font-size: 12px; color: #8a8f98; font-family: 'DM Mono', monospace; }
.visitor-note { font-size: 12px; color: #62666d; }

.day-empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 200px; gap: 12px; color: #62666d;
}
.empty-icon { font-size: 48px; }

/* ===================== Stats Bar ===================== */
.stats-bar {
  display: flex; align-items: center; gap: 32px;
  padding: 16px 0; border-top: 1px solid #23252a; margin-top: 16px;
}

.stat-item { display: flex; flex-direction: column; gap: 2px; }
.stat-label { font-size: 11px; color: #62666d; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
.stat-value { font-size: 18px; font-weight: 700; color: #f7f8f8; }

.dept-legend { display: flex; gap: 16px; margin-left: auto; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #8a8f98; }
.legend-dot { width: 8px; height: 8px; border-radius: 2px; }

/* ===================== Detail Panel ===================== */
.detail-panel {
  position: fixed; right: 0; top: 0; bottom: 0;
  width: 380px;
  background: #141516;
  border-left: 1px solid #34343a;
  z-index: 1000;
  display: flex; flex-direction: column;
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.5);
}

.panel-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px; border-bottom: 1px solid #34343a;
}

.panel-title { display: flex; align-items: baseline; gap: 8px; }
.panel-title h2 { font-size: 20px; font-weight: 700; color: #f7f8f8; }
.panel-weekday { font-size: 13px; color: #8a8f98; }
.panel-header .el-button { color: #8a8f98 !important; font-size: 16px; }
.panel-header .el-button:hover { color: #f7f8f8 !important; }

.panel-body {
  flex: 1; overflow-y: auto;
  padding: 16px 24px;
  display: flex; flex-direction: column; gap: 10px;
}

.visitor-card {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px;
  background: #1a1b1e; border: 1px solid #34343a; border-radius: 10px;
  transition: border-color 0.15s;
}
.visitor-card:hover { border-color: #5e6ad250; }

.card-left { display: flex; align-items: center; gap: 12px; }
.card-avatar {
  width: 40px; height: 40px;
  border-radius: 10px; border: 1px solid;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; font-weight: 700; flex-shrink: 0;
}
.card-info { display: flex; flex-direction: column; gap: 2px; }
.card-name { font-size: 15px; font-weight: 600; color: #f7f8f8; }
.card-dept { font-size: 12px; color: #8a8f98; }

.card-right { text-align: right; display: flex; flex-direction: column; gap: 2px; }
.card-company { font-size: 12px; color: #8a8f98; }
.card-duration { font-size: 13px; font-weight: 600; }
.card-dates { font-size: 11px; color: #62666d; font-family: 'DM Mono', monospace; }

.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 200px; gap: 12px; color: #62666d;
}
.empty-icon { font-size: 48px; }

/* ===================== Transitions ===================== */
.panel-enter-active, .panel-leave-active { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.panel-enter-from, .panel-leave-to { transform: translateX(100%); }
</style>