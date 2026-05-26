<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

// ===================== 配色方案 - 可自行修改 =====================
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

// ===================== Hover 展开 =====================
const hoveredDay = ref(null)
let showTimer = null
let hideTimer = null

const startShow = (day) => {
  clearTimeout(hideTimer)
  showTimer = setTimeout(() => {
    hoveredDay.value = day.format('YYYY-MM-DD')
  }, 150)
}

const startHide = () => {
  clearTimeout(showTimer)
  hideTimer = setTimeout(() => {
    hoveredDay.value = null
  }, 150)
}

const cancelHide = () => {
  clearTimeout(hideTimer)
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
            'is-hovered': hoveredDay === day.format('YYYY-MM-DD'),
          }"
          @click="handleDayClick(day)"
          @mouseenter="startShow(day)"
          @mouseleave="startHide"
        >
          <span class="day-number" :class="{ 'is-today': day.isSame(now, 'day') }">{{ day.date() }}</span>

          <!-- Hover展开时：显示全部姓名 -->
          <div v-if="hoveredDay === day.format('YYYY-MM-DD') && isInRange(day)" class="visitor-expanded">
            <div
              v-for="visitor in getVisitorsByDay(day)"
              :key="visitor.id"
              class="visitor-chip"
              :style="{
                background: getColor(visitor.startDate, visitor.endDate).bg,
                borderColor: getColor(visitor.startDate, visitor.endDate).border,
              }"
            >
              <span class="visitor-name" :style="{ color: getColor(visitor.startDate, visitor.endDate).text }">{{ visitor.name }}</span>
              <span
                class="visitor-arrival"
                :style="{ color: getColor(visitor.startDate, visitor.endDate).text }"
              >
                <template v-if="visitor.startDate === day.format('YYYY-MM-DD')">到</template>
                <template v-else-if="visitor.endDate === day.format('YYYY-MM-DD')">离</template>
              </span>
            </div>
          </div>

          <!-- 默认状态：少于等于3人显示芯片，超过3人显示徽章 -->
          <div v-else-if="isInRange(day)" class="visitor-list">
            <template v-if="getVisitorCount(day) <= 3">
              <div
                v-for="visitor in getVisitorsByDay(day)"
                :key="visitor.id"
                class="visitor-chip"
                :style="{
                  background: getColor(visitor.startDate, visitor.endDate).bg,
                  borderColor: getColor(visitor.startDate, visitor.endDate).border,
                }"
              >
                <span class="visitor-name" :style="{ color: getColor(visitor.startDate, visitor.endDate).text }">{{ visitor.name }}</span>
                <span
                  class="visitor-arrival"
                  :style="{ color: getColor(visitor.startDate, visitor.endDate).text }"
                >
                  <template v-if="visitor.startDate === day.format('YYYY-MM-DD')">到</template>
                  <template v-else-if="visitor.endDate === day.format('YYYY-MM-DD')">离</template>
                </span>
              </div>
            </template>
            <template v-else>
              <div
                class="visitor-badge"
                :style="{
                  background: getCellBadgeColor(day).bg,
                  borderColor: getCellBadgeColor(day).border,
                  color: getCellBadgeColor(day).text,
                }"
              >
                {{ getVisitorCount(day) }}人
              </div>
            </template>
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
          <el-button text @click="closePanel"><el-icon><Close /></el-icon></el-button>
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
  transition: background 0.15s, box-shadow 0.15s, z-index 0s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: visible;
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
.day-cell.is-hovered {
  z-index: 10;
  background: v-bind('THEME.cardBg');
  box-shadow: 0 4px 20px v-bind('THEME.shadow');
}

.day-number {
  font-size: 12px; font-weight: 500;
  color: v-bind('THEME.textMuted');
  display: block;
  text-align: right;
  align-self: flex-end;
  width: 100%;
  padding-right: 4px;
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

/* ===================== Visitor Chips (默认状态) ===================== */
.visitor-list {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
}

.visitor-chip {
  display: flex; align-items: center; gap: 2px;
  padding: 3px 6px;
  border-radius: 6px;
  border: 1px solid;
  font-size: 11px;
  transition: opacity 0.15s;
  overflow: hidden;
  width: 100%;
}
.visitor-chip:hover { opacity: 0.85; }

.visitor-name {
  font-weight: 600;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  flex: 1; min-width: 0;
  font-size: 12px;
}

.visitor-arrival {
  font-size: 9px; font-weight: 700;
  flex-shrink: 0;
  margin-left: 2px;
}

/* ===================== Visitor Badge (超3人默认状态) ===================== */
.visitor-badge {
  margin-top: auto;
  margin-bottom: 4px;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1.5px solid;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

/* ===================== Expanded Visitor List (Hover状态) ===================== */
.visitor-expanded {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  overflow-y: auto;
  max-height: 300px;
}

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

.visitor-count-row {
  display: flex; align-items: baseline; gap: 6px;
  padding: 12px 16px;
  background: v-bind('THEME.pageBg');
  border-radius: 10px;
}

.visitor-count-num { font-size: 28px; font-weight: 700; }
.visitor-count-label { font-size: 14px; color: v-bind('THEME.textSecondary'); }

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

.card-detail-divider {
  height: 1px;
  background: v-bind('THEME.border');
  margin: 4px 0;
}

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

.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 200px; gap: 12px; color: v-bind('THEME.textMuted');
}
.empty-icon { font-size: 48px; }

/* ===================== Transitions ===================== */
.panel-enter-active, .panel-leave-active { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.panel-enter-from, .panel-leave-to { transform: translateX(100%); }
</style>