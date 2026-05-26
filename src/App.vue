<script setup>
import { ref, computed, watch } from 'vue'
import dayjs from 'dayjs'

// ===================== Data =====================
// 模拟数据 - 实际使用时替换为真实数据源
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

// 部门配色映射
const departmentColors = {
  '技术部': { bg: 'rgba(94, 106, 210, 0.15)', border: '#5e6ad2', text: '#828fff' },
  '财务部': { bg: 'rgba(39, 166, 68, 0.12)', border: '#27a644', text: '#4ade80' },
  '市场部': { bg: 'rgba(249, 115, 22, 0.12)', border: '#f97316', text: '#fb923c' },
  '人力资源': { bg: 'rgba(168, 85, 247, 0.12)', border: '#a855f7', text: '#c084fc' },
  '销售部': { bg: 'rgba(236, 72, 153, 0.12)', border: '#ec4899', text: '#f472b6' },
}

const getDeptColor = (dept) => {
  return departmentColors[dept] || { bg: 'rgba(255,255,255,0.06)', border: '#555', text: '#aaa' }
}

// ===================== Calendar Logic =====================
const currentDate = ref(dayjs())
const selectedDate = ref(null)
const expandedDays = ref({}) // key: 'YYYY-MM-DD', value: true/false

// 当前月数据
const calendarData = computed(() => {
  return Array.from({ length: 42 }, (_, i) => {
    const startOfMonth = currentDate.value.startOf('month')
    const dayOfWeek = startOfMonth.day() // 0=周日
    const day = startOfMonth.subtract(dayOfWeek, 'day').add(i, 'day')
    return day
  })
})

// 检查某天有哪些访客（出差期间覆盖该天）
const getVisitorsByDay = (day) => {
  const dayStr = day.format('YYYY-MM-DD')
  return visitors.value.filter(v => {
    return day.isSameOrAfter(dayjs(v.startDate), 'day') && day.isSameOrBefore(dayjs(v.endDate), 'day')
  })
}

// 某天访客数
const getVisitorCount = (day) => getVisitorsByDay(day).length

// 某天是否在出差期间
const isInRange = (day) => getVisitorCount(day) > 0

// 某天是否为本月
const isCurrentMonth = (day) => day.month() === currentDate.value.month()

// 处理日期点击
const handleDayClick = (day) => {
  selectedDate.value = day.format('YYYY-MM-DD')
}

// 切换月份
const prevMonth = () => { currentDate.value = currentDate.value.subtract(1, 'month') }
const nextMonth = () => { currentDate.value = currentDate.value.add(1, 'month') }
const goToday = () => { currentDate.value = dayjs() }

// 展开/收起某天
const toggleExpand = (dayStr, e) => {
  e.stopPropagation()
  expandedDays.value[dayStr] = !expandedDays.value[dayStr]
}

// ===================== Detail Panel =====================
const selectedDayVisitors = computed(() => {
  if (!selectedDate.value) return []
  return getVisitorsByDay(dayjs(selectedDate.value))
})

const closePanel = () => { selectedDate.value = null }

// ===================== Init =====================
const now = dayjs()
const dayStr = now.format('YYYY-MM-DD')
// 默认展开今天
expandedDays.value[dayStr] = true
</script>

<template>
  <div class="calendar-wrapper">
    <!-- Header -->
    <header class="calendar-header">
      <div class="header-left">
        <div class="brand">
          <span class="brand-dot"></span>
          <span class="brand-text">Visitor Calendar</span>
        </div>
        <h1 class="month-title">{{ currentDate.format('YYYY年M月') }}</h1>
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

    <!-- Calendar Grid -->
    <div class="calendar-grid">
      <!-- Weekday labels -->
      <div class="weekday-row">
        <span v-for="(day, i) in ['日','一','二','三','四','五','六']" :key="i" class="weekday-label">
          星期{{ day }}
        </span>
      </div>

      <!-- Day cells -->
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
          <!-- Day number -->
          <span class="day-number" :class="{ 'is-today': day.isSame(now, 'day') }">
            {{ day.date() }}
          </span>

          <!-- Visitor cards -->
          <div v-if="isInRange(day)" class="visitor-list">
            <!-- 展示的访客 -->
            <template v-for="(visitor, vi) in (expandedDays[day.format('YYYY-MM-DD')] ? getVisitorsByDay(day) : getVisitorsByDay(day).slice(0, 2))" :key="visitor.id">
              <div
                class="visitor-chip"
                :style="{
                  background: getDeptColor(visitor.department).bg,
                  borderColor: getDeptColor(visitor.department).border,
                }"
                :title="`${visitor.name} (${visitor.position})`"
              >
                <span class="visitor-avatar" :style="{ color: getDeptColor(visitor.department).text }">
                  {{ visitor.name.slice(-2) }}
                </span>
                <span class="visitor-name" :style="{ color: getDeptColor(visitor.department).text }">
                  {{ visitor.name }}
                </span>
                <span
                  class="visitor-dept"
                  :style="{ background: getDeptColor(visitor.department).border + '22', color: getDeptColor(visitor.department).text }"
                >
                  {{ visitor.department }}
                </span>
              </div>
            </template>

            <!-- 展开更多 -->
            <div
              v-if="getVisitorCount(day) > 2 && !expandedDays[day.format('YYYY-MM-DD')]"
              class="more-count"
              @click="toggleExpand(day.format('YYYY-MM-DD'), $event)"
            >
              <span>+{{ getVisitorCount(day) - 2 }} 人</span>
            </div>

            <!-- 收起 -->
            <div
              v-if="getVisitorCount(day) > 2 && expandedDays[day.format('YYYY-MM-DD')]"
              class="collapse-btn"
              @click="toggleExpand(day.format('YYYY-MM-DD'), $event)"
            >
              <span>收起</span>
            </div>
          </div>

          <!-- Start/End indicators -->
          <template v-if="isInRange(day)">
            <div
              v-for="visitor in getVisitorsByDay(day).filter(v => v.startDate === day.format('YYYY-MM-DD'))"
              :key="'s-' + visitor.id"
              class="date-indicator start"
              :style="{ background: getDeptColor(visitor.department).border }"
              :title="`开始: ${visitor.name}`"
            >
              <span>入</span>
            </div>
            <div
              v-for="visitor in getVisitorsByDay(day).filter(v => v.endDate === day.format('YYYY-MM-DD'))"
              :key="'e-' + visitor.id"
              class="date-indicator end"
              :style="{ background: getDeptColor(visitor.department).border }"
              :title="`结束: ${visitor.name}`"
            >
              <span>离</span>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Stats bar -->
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
        <span
          v-for="(color, dept) in departmentColors"
          :key="dept"
          class="legend-item"
        >
          <span class="legend-dot" :style="{ background: color.border }"></span>
          {{ dept }}
        </span>
      </div>
    </div>

    <!-- Detail Panel -->
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
            <div
              v-for="visitor in selectedDayVisitors"
              :key="visitor.id"
              class="visitor-card"
            >
              <div class="card-left">
                <div
                  class="card-avatar"
                  :style="{ background: getDeptColor(visitor.department).bg, borderColor: getDeptColor(visitor.department).border, color: getDeptColor(visitor.department).text }"
                >
                  {{ visitor.name.slice(0, 1) }}
                </div>
                <div class="card-info">
                  <div class="card-name">{{ visitor.name }}</div>
                  <div class="card-dept" :style="{ color: getDeptColor(visitor.department).text }">{{ visitor.department }} · {{ visitor.position }}</div>
                </div>
              </div>
              <div class="card-right">
                <div class="card-company">{{ visitor.company }}</div>
                <div class="card-dates">
                  <span>{{ visitor.startDate }} ~ {{ visitor.endDate }}</span>
                </div>
              </div>
            </div>

            <div v-if="selectedDayVisitors.length > 1" class="summary-text">
              共 {{ selectedDayVisitors.length }} 位同事当天出差
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
  margin-bottom: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-dot {
  width: 8px;
  height: 8px;
  background: #5e6ad2;
  border-radius: 50%;
  box-shadow: 0 0 8px #5e6ad280;
}

.brand-text {
  font-size: 12px;
  font-weight: 600;
  color: #8a8f98;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.month-title {
  font-size: 24px;
  font-weight: 700;
  color: #f7f8f8;
  letter-spacing: -0.5px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.header-right .el-button {
  color: #8a8f98 !important;
  font-size: 14px;
}

.header-right .el-button:hover {
  color: #f7f8f8 !important;
}

/* ===================== Calendar Grid ===================== */
.calendar-grid {
  flex: 1;
  padding-top: 16px;
}

.weekday-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0;
  margin-bottom: 8px;
}

.weekday-label {
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: #62666d;
  letter-spacing: 0.5px;
  padding: 8px 0;
  text-transform: uppercase;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0;
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

.day-cell:hover {
  background: #0f1011;
}

.day-cell:nth-child(7n) {
  border-right: none;
}

.day-cell:nth-last-child(-n+7) {
  border-bottom: none;
}

.day-cell:not(.is-current-month) {
  background: #0a0a0d;
}

.day-cell.is-today {
  background: rgba(94, 106, 210, 0.06);
}

.day-cell.is-selected {
  background: rgba(94, 106, 210, 0.12) !important;
  box-shadow: inset 0 0 0 1px #5e6ad240;
}

.day-number {
  font-size: 12px;
  font-weight: 500;
  color: #62666d;
  display: block;
  margin-bottom: 6px;
  text-align: right;
}

.is-current-month .day-number {
  color: #8a8f98;
}

.day-number.is-today {
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  background: #5e6ad2;
  color: #fff !important;
  border-radius: 50%;
  font-weight: 700;
  margin-top: -2px;
  margin-right: -2px;
}

/* ===================== Visitor Chips ===================== */
.visitor-list {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

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

.visitor-chip:hover {
  opacity: 0.85;
}

.visitor-avatar {
  font-size: 10px;
  font-weight: 700;
  opacity: 0.9;
  flex-shrink: 0;
}

.visitor-name {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}

.visitor-dept {
  font-size: 9px;
  font-weight: 600;
  padding: 1px 4px;
  border-radius: 3px;
  flex-shrink: 0;
  white-space: nowrap;
}

.more-count {
  font-size: 10px;
  color: #5e6ad2;
  font-weight: 600;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  background: rgba(94, 106, 210, 0.1);
  text-align: center;
}

.more-count:hover {
  background: rgba(94, 106, 210, 0.2);
}

.collapse-btn {
  font-size: 10px;
  color: #62666d;
  cursor: pointer;
  padding: 2px 4px;
  text-align: center;
}

.collapse-btn:hover {
  color: #8a8f98;
}

/* ===================== Date Indicators ===================== */
.date-indicator {
  position: absolute;
  bottom: 4px;
  font-size: 9px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 3px;
  color: #fff;
  letter-spacing: 0.3px;
}

.date-indicator.start {
  left: 8px;
}

.date-indicator.end {
  right: 8px;
}

/* ===================== Stats Bar ===================== */
.stats-bar {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 16px 0;
  border-top: 1px solid #23252a;
  margin-top: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-label {
  font-size: 11px;
  color: #62666d;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: #f7f8f8;
}

.dept-legend {
  display: flex;
  gap: 16px;
  margin-left: auto;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #8a8f98;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

/* ===================== Detail Panel ===================== */
.detail-panel {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 380px;
  background: #141516;
  border-left: 1px solid #34343a;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.5);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #34343a;
}

.panel-title {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.panel-title h2 {
  font-size: 20px;
  font-weight: 700;
  color: #f7f8f8;
}

.panel-weekday {
  font-size: 13px;
  color: #8a8f98;
}

.panel-header .el-button {
  color: #8a8f98 !important;
  font-size: 16px;
}

.panel-header .el-button:hover {
  color: #f7f8f8 !important;
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.visitor-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: #1a1b1e;
  border: 1px solid #34343a;
  border-radius: 10px;
  transition: border-color 0.15s;
}

.visitor-card:hover {
  border-color: #5e6ad250;
}

.card-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-name {
  font-size: 15px;
  font-weight: 600;
  color: #f7f8f8;
}

.card-dept {
  font-size: 12px;
  font-weight: 500;
}

.card-right {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-company {
  font-size: 12px;
  color: #8a8f98;
}

.card-dates {
  font-size: 11px;
  color: #62666d;
  font-family: 'DM Mono', monospace;
}

.summary-text {
  font-size: 12px;
  color: #62666d;
  text-align: center;
  padding: 8px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  gap: 12px;
  color: #62666d;
}

.empty-icon {
  font-size: 48px;
}

/* ===================== Transitions ===================== */
.panel-enter-active,
.panel-leave-active {
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.panel-enter-from,
.panel-leave-to {
  transform: translateX(100%);
}
</style>