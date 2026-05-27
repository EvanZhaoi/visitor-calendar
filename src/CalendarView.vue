<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

// ===================== 配色方案 =====================
const THEME = {
  pageBg: '#F5F3FD',
  cardBg: '#FFFFFF',
  accent: '#82BDA4',
  textPrimary: '#2D2D3A',
  textSecondary: '#6B6B80',
  textMuted: '#9B9BB0',
  textOnDark: '#FFFFFF',
  border: '#E8E4F0',
  shadow: 'rgba(27, 26, 87, 0.08)',
}

const TRIP_CONFIG = {
  short:  { label: '短途', maxDays: 2, color: { bg: 'rgba(130, 189, 164, 0.12)', border: '#82BDA4', text: '#5FA885' } },
  medium: { label: '中途', maxDays: 5, color: { bg: 'rgba(27, 26, 87, 0.08)', border: '#1B1A57', text: '#1B1A57' } },
  long:   { label: '长途', maxDays: Infinity, color: { bg: 'rgba(245, 166, 35, 0.10)', border: '#F5A623', text: '#C47D0A' } },
}

const getTripDuration = (startDate, endDate) => dayjs(endDate).diff(dayjs(startDate), 'day') + 1
const getTripLevel = (startDate, endDate) => {
  const days = getTripDuration(startDate, endDate)
  if (days <= TRIP_CONFIG.short.maxDays) return 'short'
  if (days <= TRIP_CONFIG.medium.maxDays) return 'medium'
  return 'long'
}
const getColor = (startDate, endDate) => TRIP_CONFIG[getTripLevel(startDate, endDate)].color
const getDurationLabel = (startDate, endDate) => `${TRIP_CONFIG[getTripLevel(startDate, endDate)].label}${getTripDuration(startDate, endDate)}天`

const visitors = ref([
  { id: 1,  name: '张伟',   company: '总公司', department: '技术部',   position: '架构师',       startDate: '2026-05-05', endDate: '2026-05-08', phone: '138xxxx0001', note: '系统架构升级项目' },
  { id: 2,  name: '李娜',   company: '总公司', department: '财务部',   position: '财务经理',     startDate: '2026-05-05', endDate: '2026-05-06', phone: '138xxxx0002', note: '季度审计' },
  { id: 3,  name: '王强',   company: '总公司', department: '市场部',   position: '市场总监',     startDate: '2026-05-05', endDate: '2026-05-07', phone: '138xxxx0003', note: '市场调研' },
  { id: 4,  name: '赵磊',   company: '总公司', department: '技术部',   position: '项目经理',     startDate: '2026-05-05', endDate: '2026-05-09', phone: '138xxxx0004', note: '项目启动会' },
  { id: 5,  name: '陈静',   company: '总公司', department: '人力资源', position: 'HR主管',       startDate: '2026-05-05', endDate: '2026-05-05', phone: '138xxxx0005', note: '面试招聘' },
  { id: 6,  name: '周敏',   company: '总公司', department: '市场部',   position: '品牌经理',     startDate: '2026-05-08', endDate: '2026-05-10', phone: '138xxxx0006', note: '品牌推广活动' },
  { id: 7,  name: '吴昊',   company: '总公司', department: '财务部',   position: '会计',         startDate: '2026-05-08', endDate: '2026-05-12', phone: '138xxxx0007', note: '税务检查' },
  { id: 8,  name: '孙丽',   company: '总公司', department: '销售部',   position: '销售总监',     startDate: '2026-05-08', endDate: '2026-05-11', phone: '138xxxx0008', note: '客户拜访' },
  { id: 9,  name: '郑阳',   company: '总公司', department: '技术部',   position: 'DBA',          startDate: '2026-05-08', endDate: '2026-05-10', phone: '138xxxx0009', note: '数据库迁移' },
  { id: 10, name: '冯凯',   company: '总公司', department: '运营部',   position: '运营经理',     startDate: '2026-05-08', endDate: '2026-05-09', phone: '138xxxx0010', note: '运营巡查' },
  { id: 11, name: '韩梅',   company: '总公司', department: '行政部',   position: '行政主管',     startDate: '2026-05-08', endDate: '2026-05-08', phone: '138xxxx0011', note: '物资采购' },
  { id: 12, name: '杨洋',   company: '总公司', department: '技术部',   position: '高级工程师',   startDate: '2026-05-10', endDate: '2026-05-14', phone: '138xxxx0012', note: '系统升级' },
  { id: 13, name: '邹婷',   company: '总公司', department: '财务部',   position: '审计专员',     startDate: '2026-05-11', endDate: '2026-05-15', phone: '138xxxx0013', note: '内审工作' },
  { id: 14, name: '许健',   company: '总公司', department: '市场部',   position: '策划主管',     startDate: '2026-05-11', endDate: '2026-05-13', phone: '138xxxx0014', note: '营销方案制定' },
  { id: 15, name: '蒋超',   company: '总公司', department: '技术部',   position: '测试工程师',   startDate: '2026-05-12', endDate: '2026-05-14', phone: '138xxxx0015', note: 'UAT测试' },
  { id: 16, name: '钱伟',   company: '总公司', department: '销售部',   position: '客户经理',     startDate: '2026-05-12', endDate: '2026-05-13', phone: '138xxxx0016', note: '合同谈判' },
  { id: 17, name: '沈莉',   company: '总公司', department: '人力资源', position: '招聘专员',     startDate: '2026-05-12', endDate: '2026-05-12', phone: '138xxxx0017', note: '校园宣讲' },
  { id: 18, name: '秦明',   company: '总公司', department: '技术部',   position: '产品经理',     startDate: '2026-05-12', endDate: '2026-05-16', phone: '138xxxx0018', note: '需求评审' },
  { id: 19, name: '杜斌',   company: '总公司', department: '财务部',   position: '成本会计',     startDate: '2026-05-12', endDate: '2026-05-14', phone: '138xxxx0019', note: '成本核算' },
  { id: 20, name: '苏敏',   company: '总公司', department: '市场部',   position: '文案策划',     startDate: '2026-05-12', endDate: '2026-05-12', phone: '138xxxx0020', note: '文案审核' },
  { id: 21, name: '卢杰',   company: '总公司', department: '运营部',   position: '数据分析师',   startDate: '2026-05-12', endDate: '2026-05-15', phone: '138xxxx0021', note: '数据分析报告' },
  { id: 22, name: '高峰',   company: '总公司', department: '技术部',   position: '前端工程师',   startDate: '2026-05-12', endDate: '2026-05-18', phone: '138xxxx0022', note: '前端开发' },
  { id: 23, name: '金鑫',   company: '总公司', department: '销售部',   position: '区域总监',     startDate: '2026-05-12', endDate: '2026-05-14', phone: '138xxxx0023', note: '区域会议' },
  { id: 24, name: '华磊',   company: '总公司', department: '法务部',   position: '法务经理',     startDate: '2026-05-12', endDate: '2026-05-13', phone: '138xxxx0024', note: '合同法审' },
  { id: 25, name: '章文',   company: '总公司', department: '技术部',   position: '架构师',       startDate: '2026-05-12', endDate: '2026-05-17', phone: '138xxxx0025', note: '技术架构规划' },
  { id: 26, name: '程瑶',   company: '总公司', department: '市场部',   position: '市场专员',     startDate: '2026-05-12', endDate: '2026-05-12', phone: '138xxxx0026', note: '市场活动执行' },
  { id: 27, name: '贺涛',   company: '总公司', department: 'IT部',     position: '运维工程师',   startDate: '2026-05-12', endDate: '2026-05-16', phone: '138xxxx0027', note: '服务器维护' },
  { id: 28, name: '贺婷',   company: '总公司', department: 'IT部',     position: 'IT主管',       startDate: '2026-05-12', endDate: '2026-05-13', phone: '138xxxx0028', note: 'IT巡检' },
  { id: 29, name: '钟明',   company: '总公司', department: '技术部',   position: '后端工程师',   startDate: '2026-05-12', endDate: '2026-05-19', phone: '138xxxx0029', note: '后端开发' },
  { id: 30, name: '钟敏',   company: '总公司', department: '财务部',   position: '出纳',         startDate: '2026-05-12', endDate: '2026-05-14', phone: '138xxxx0030', note: '月度结算' },
  { id: 31, name: '卫华',   company: '总公司', department: '行政部',   position: '行政专员',     startDate: '2026-05-12', endDate: '2026-05-12', phone: '138xxxx0031', note: '办公用品采购' },
  { id: 32, name: '刘洋',   company: '总公司', department: '技术部',   position: '高级工程师',   startDate: '2026-05-15', endDate: '2026-05-20', phone: '138xxxx0032', note: 'ERP系统实施' },
  { id: 33, name: '陈静',   company: '总公司', department: '人力资源', position: 'HR主管',       startDate: '2026-05-16', endDate: '2026-05-17', phone: '138xxxx0033', note: '绩效考核培训' },
  { id: 34, name: '周杰',   company: '总公司', department: '市场部',   position: 'BD经理',       startDate: '2026-05-18', endDate: '2026-05-22', phone: '138xxxx0034', note: '商务洽谈' },
  { id: 35, name: '吴林',   company: '总公司', department: '技术部',   position: '安全工程师',   startDate: '2026-05-19', endDate: '2026-05-21', phone: '138xxxx0035', note: '安全巡检' },
  { id: 36, name: '孙倩',   company: '总公司', department: '销售部',   position: '客服主管',     startDate: '2026-05-20', endDate: '2026-05-23', phone: '138xxxx0036', note: '客户服务支持' },
  { id: 37, name: '郑龙',   company: '总公司', department: '技术部',   position: 'AI工程师',     startDate: '2026-05-21', endDate: '2026-05-27', phone: '138xxxx0037', note: 'AI模型训练' },
  { id: 38, name: '冯霞',   company: '总公司', department: '运营部',   position: '运营专员',     startDate: '2026-05-22', endDate: '2026-05-24', phone: '138xxxx0038', note: '运营数据分析' },
  { id: 39, name: '韩鹏',   company: '总公司', department: '技术部',   position: 'DevOps工程师', startDate: '2026-05-23', endDate: '2026-05-28', phone: '138xxxx0039', note: 'CI/CD部署' },
  { id: 40, name: '杨慧',   company: '总公司', department: '财务部',   position: '税务专员',     startDate: '2026-05-24', endDate: '2026-05-26', phone: '138xxxx0040', note: '税务申报' },
  { id: 41, name: '邹凯',   company: '总公司', department: '市场部',   position: '投放经理',     startDate: '2026-05-25', endDate: '2026-05-30', phone: '138xxxx0041', note: '广告投放优化' },
  { id: 42, name: '许莉',   company: '总公司', department: '行政部',   position: '前台主管',     startDate: '2026-05-26', endDate: '2026-05-27', phone: '138xxxx0042', note: '接待安排' },
  { id: 43, name: '蒋晨',   company: '总公司', department: 'IT部',     position: '网络工程师',   startDate: '2026-05-27', endDate: '2026-05-29', phone: '138xxxx0043', note: '网络改造' },
  { id: 44, name: '钱峰',   company: '总公司', department: '技术部',   position: '移动端负责人', startDate: '2026-05-28', endDate: '2026-05-30', phone: '138xxxx0044', note: 'APP发布准备' },
])

// ===================== 日历逻辑 =====================
const now = dayjs()
const selectedDate = ref(null)
const currentDate = ref(dayjs())
const hoveredDay = ref(null)

const weeks = computed(() => {
  const startOfMonth = currentDate.value.startOf('month')
  const startOfCalendar = startOfMonth.subtract(startOfMonth.day(), 'day')
  return Array.from({ length: 6 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => startOfCalendar.add(w * 7 + d, 'day'))
  )
})

const getVisitorsByDay = (day) => visitors.value.filter(v =>
  day.isSameOrAfter(dayjs(v.startDate), 'day') && day.isSameOrBefore(dayjs(v.endDate), 'day')
)
const getVisitorCount = (day) => getVisitorsByDay(day).length
const isInRange = (day) => getVisitorCount(day) > 0
const isCurrentMonth = (day) => day.month() === currentDate.value.month()

const getCellBadgeColor = (day) => {
  const vis = getVisitorsByDay(day)
  if (!vis.length) return TRIP_CONFIG.short.color
  if (vis.some(v => getTripLevel(v.startDate, v.endDate) === 'long')) return TRIP_CONFIG.long.color
  if (vis.some(v => getTripLevel(v.startDate, v.endDate) === 'medium')) return TRIP_CONFIG.medium.color
  return TRIP_CONFIG.short.color
}

const handleDayClick = (day) => { selectedDate.value = day.format('YYYY-MM-DD') }
const prevMonth = () => { currentDate.value = currentDate.value.subtract(1, 'month') }
const nextMonth = () => { currentDate.value = currentDate.value.add(1, 'month') }
const goToday = () => { currentDate.value = dayjs() }
const headerTitle = computed(() => currentDate.value.format('YYYY年M月'))

let showTimer = null
let hideTimer = null

const startShow = (day) => {
  clearTimeout(hideTimer)
  showTimer = setTimeout(() => { hoveredDay.value = day.format('YYYY-MM-DD') }, 150)
}

const startHide = () => {
  clearTimeout(showTimer)
  hideTimer = setTimeout(() => { hoveredDay.value = null }, 150)
}

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
        <el-button text @click="prevMonth"><el-icon><ArrowLeft /></el-icon></el-button>
        <el-button text @click="nextMonth"><el-icon><ArrowRight /></el-icon></el-button>
        <el-button text>
          <router-link to="/gantt" style="text-decoration:none;color:inherit;">甘特图</router-link>
        </el-button>
      </div>
    </header>

    <!-- ===================== Calendar Body ===================== -->
    <div class="calendar-body">
      <!-- Weekday header -->
      <div class="weekday-row">
        <span v-for="(d, i) in ['日','一','二','三','四','五','六']" :key="i" class="weekday-label">星期{{ d }}</span>
      </div>

      <!-- 6 weeks -->
      <div v-for="(week, wi) in weeks" :key="wi" class="calendar-week">
        <div
          v-for="(day, di) in week"
          :key="di"
          class="day-cell"
          :class="{
            'is-today': day.isSame(now, 'day'),
            'is-selected': day.format('YYYY-MM-DD') === selectedDate,
            'is-current-month': isCurrentMonth(day),
            'has-visitors': isInRange(day),
            'is-hovered': hoveredDay === day.format('YYYY-MM-DD'),
          }"
          @click="handleDayClick(day)"
          @mouseenter="startShow(day)"
          @mouseleave="startHide"
        >
          <span class="day-number" :class="{ 'is-today': day.isSame(now, 'day') }">{{ day.date() }}</span>

          <!-- Hover时全部显示 -->
          <div class="visitor-list" :class="{ 'is-hovering': hoveredDay === day.format('YYYY-MM-DD') }">
            <template v-if="hoveredDay === day.format('YYYY-MM-DD')">
              <div
                v-for="visitor in getVisitorsByDay(day)"
                :key="visitor.id"
                class="visitor-tag"
                :style="{ background: getColor(visitor.startDate, visitor.endDate).bg, borderColor: getColor(visitor.startDate, visitor.endDate).border, color: getColor(visitor.startDate, visitor.endDate).text }"
              >
                <template v-if="visitor.startDate === day.format('YYYY-MM-DD')">到</template>
                <template v-else-if="visitor.endDate === day.format('YYYY-MM-DD')">离</template>
                <template v-else>{{ getDurationLabel(visitor.startDate, visitor.endDate) }}</template>
              </div>
            </template>
            <!-- 非Hover显示badge -->
            <template v-else>
              <div
                v-if="getVisitorCount(day) > 0"
                class="visitor-badge"
                :style="{ background: getCellBadgeColor(day).bg, borderColor: getCellBadgeColor(day).border }"
              >
                <span class="badge-count">{{ getVisitorCount(day) }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== 侧边详情面板 ===================== -->
    <Transition name="slide">
      <div v-if="selectedDate" class="detail-panel" :style="{ background: THEME.cardBg }">
        <div class="panel-header" :style="{ borderColor: THEME.border }">
          <div>
            <div class="panel-date">{{ selectedDate }}</div>
            <div class="panel-count">{{ selectedDayVisitors.length }} 位访客</div>
          </div>
          <el-button text @click="closePanel"><el-icon><Close /></el-icon></el-button>
        </div>
        <div class="panel-body">
          <div
            v-for="visitor in selectedDayVisitors"
            :key="visitor.id"
            class="visitor-card"
            :style="{ borderColor: getColor(visitor.startDate, visitor.endDate).border, borderLeftColor: getColor(visitor.startDate, visitor.endDate).border }"
          >
            <div class="visitor-info">
              <div class="visitor-name">{{ visitor.name }}</div>
              <div class="visitor-dept">{{ visitor.company }} · {{ visitor.department }}</div>
            </div>
            <div class="visitor-meta">
              <el-tag size="small" :style="{ background: getColor(visitor.startDate, visitor.endDate).bg, borderColor: getColor(visitor.startDate, visitor.endDate).border, color: getColor(visitor.startDate, visitor.endDate).text }">
                {{ getDurationLabel(visitor.startDate, visitor.endDate) }}
              </el-tag>
            </div>
            <div class="visitor-note">{{ visitor.note }}</div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.calendar-wrapper {
  min-height: 100vh;
  background: v-bind('THEME.pageBg');
  padding: 20px;
  box-sizing: border-box;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px 20px;
  background: v-bind('THEME.cardBg');
  border-radius: 12px;
  border: 1px solid v-bind('THEME.border');
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 6px;
}

.brand-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: v-bind('THEME.accent');
}

.brand-text {
  font-size: 13px;
  font-weight: 600;
  color: v-bind('THEME.textMuted');
  letter-spacing: 0.5px;
}

.month-title {
  font-size: 22px;
  font-weight: 600;
  color: v-bind('THEME.textPrimary');
  margin: 0;
}

.header-right {
  display: flex;
  gap: 4px;
  align-items: center;
}

.calendar-body {
  background: v-bind('THEME.cardBg');
  border-radius: 12px;
  border: 1px solid v-bind('THEME.border');
  overflow: hidden;
  padding: 12px;
}

.weekday-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
}

.weekday-label {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: v-bind('THEME.textMuted');
  padding: 4px;
}

.calendar-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 4px;
}

.day-cell {
  min-height: 80px;
  border-radius: 8px;
  padding: 6px;
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
  background: v-bind('THEME.cardBg');
  border: 1px solid transparent;
}

.day-cell.is-current-month .day-number {
  color: v-bind('THEME.textPrimary');
}

.day-cell:not(.is-current-month) .day-number {
  color: v-bind('THEME.textMuted');
}

.day-cell.has-visitors {
  background: v-bind('THEME.pageBg');
}

.day-cell.is-today {
  border-color: v-bind('THEME.accent');
}

.day-cell.is-selected {
  background: v-bind('THEME.pageBg');
  border-color: v-bind('THEME.accent');
}

.day-cell.is-hovered {
  background: v-bind('THEME.pageBg');
  border-color: v-bind('THEME.border');
}

.day-number {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.day-number.is-today {
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 50%;
  background: v-bind('THEME.accent');
  color: v-bind('THEME.textOnDark');
}

.visitor-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 2px;
}

.visitor-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-radius: 6px;
  padding: 0 4px;
  height: 20px;
}

.badge-count {
  font-size: 11px;
  font-weight: 600;
}

.visitor-tag {
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.visitor-list.is-hovering {
  gap: 2px;
}

.visitor-list:not(.is-hovering) .visitor-tag {
  display: none;
}

/* 侧边详情面板 */
.detail-panel {
  position: fixed;
  right: 20px;
  top: 80px;
  width: 300px;
  max-height: calc(100vh - 100px);
  border-radius: 12px;
  border: 1px solid v-bind('THEME.border');
  box-shadow: 0 8px 24px v-bind('THEME.shadow');
  overflow: hidden;
  z-index: 50;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid;
}

.panel-date {
  font-size: 14px;
  font-weight: 600;
  color: v-bind('THEME.textPrimary');
}

.panel-count {
  font-size: 12px;
  color: v-bind('THEME.textMuted');
  margin-top: 2px;
}

.panel-body {
  padding: 12px;
  overflow-y: auto;
  max-height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.visitor-card {
  border: 1px solid;
  border-left: 3px solid;
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.visitor-name {
  font-size: 14px;
  font-weight: 600;
  color: v-bind('THEME.textPrimary');
}

.visitor-dept {
  font-size: 12px;
  color: v-bind('THEME.textSecondary');
}

.visitor-meta {
  margin-top: 2px;
}

.visitor-note {
  font-size: 12px;
  color: v-bind('THEME.textMuted');
}

/* 过渡动画 */
.slide-enter-active, .slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>