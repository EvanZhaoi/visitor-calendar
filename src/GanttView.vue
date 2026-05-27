<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

// ===================== 配色方案（复用 App.vue） =====================
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

// ===================== 数据（复用 App.vue） =====================
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

// ===================== 月份切换 =====================
const now = dayjs()
const currentMonth = ref(dayjs())

const prevMonth = () => { currentMonth.value = currentMonth.value.subtract(1, 'month') }
const nextMonth = () => { currentMonth.value = currentMonth.value.add(1, 'month') }
const goToday = () => { currentMonth.value = dayjs() }

// ===================== 日期轴（当前月 +前后各1天） =====================
const dateRange = computed(() => {
  const start = currentMonth.value.startOf('month').subtract(1, 'day')
  const end = currentMonth.value.endOf('month').add(1, 'day')
  const days = []
  let d = start
  while (d.isBefore(end) || d.isSame(end, 'day')) {
    days.push(d)
    d = d.add(1, 'day')
  }
  return days
})

const cellWidth = 32 // px per day
const rowHeight = 40  // px per visitor row

// ===================== 详情弹窗 =====================
const selectedVisitor = ref(null)
const showDetail = (v) => { selectedVisitor.value = v }
const closeDetail = () => { selectedVisitor.value = null }

// ===================== 工具函数 =====================
const isToday = (d) => d.isSame(now, 'day')
const isCurrentMonth = (d) => d.isSame(currentMonth.value, 'month')
const isWeekend = (d) => d.day() === 0 || d.day() === 6
const getTripStyle = (v) => {
  const start = dayjs(v.startDate)
  const end = dayjs(v.endDate)
  const rangeStart = dateRange.value[0]
  const offset = start.diff(rangeStart, 'day')
  const duration = getTripDuration(v.startDate, v.endDate)
  const color = getColor(v.startDate, v.endDate)
  const left = offset * cellWidth
  const width = duration * cellWidth - 4
  return { left: `${left}px`, width: `${width}px`, ...color }
}
</script>

<template>
  <div class="gantt-page" :style="{ background: THEME.pageBg }">
    <!-- Header -->
    <div class="gantt-header" :style="{ background: THEME.cardBg, borderColor: THEME.border }">
      <div class="header-left">
        <span class="title">访客甘特图</span>
        <span class="visitor-count">{{ visitors.length }}人</span>
      </div>
      <div class="header-right">
        <router-link to="/" style="text-decoration:none;">
          <el-button text>返回日历</el-button>
        </router-link>
        <button class="nav-btn" @click="prevMonth">◀</button>
        <span class="month-label">{{ currentMonth.format('YYYY年MM月') }}</span>
        <button class="nav-btn" @click="nextMonth">▶</button>
        <button class="today-btn" @click="goToday">今天</button>
      </div>
    </div>

    <!-- 图例 -->
    <div class="legend" :style="{ background: THEME.cardBg, borderColor: THEME.border }">
      <span v-for="(config, key) in TRIP_CONFIG" :key="key" class="legend-item">
        <span class="legend-dot" :style="{ background: config.color.border }"></span>
        {{ config.label }}
      </span>
      <span class="legend-item today-dot">
        <span class="legend-dot" :style="{ background: '#E53935' }"></span>
        今日
      </span>
    </div>

    <!-- 甘特图主体 -->
    <div class="gantt-body" :style="{ background: THEME.cardBg, borderColor: THEME.border }">
      <!-- 左侧：访客姓名列表 -->
      <div class="visitor-list">
        <div class="list-header" :style="{ background: THEME.pageBg, borderColor: THEME.border }">
          <span>访客姓名</span>
        </div>
        <div class="list-rows">
          <div
            v-for="v in visitors"
            :key="v.id"
            class="visitor-row"
            :style="{ height: `${rowHeight}px`, borderColor: THEME.border }"
            @click="showDetail(v)"
          >
            <span class="visitor-name">{{ v.name }}</span>
          </div>
        </div>
      </div>

      <!-- 右侧：甘特条 -->
      <div class="gantt-chart">
        <!-- 表头：日期 -->
        <div class="chart-header" :style="{ background: THEME.pageBg, borderColor: THEME.border }">
          <div
            v-for="d in dateRange"
            :key="d.format('YYYY-MM-DD')"
            class="date-cell"
            :style="{ width: `${cellWidth}px`, color: isToday(d) ? '#E53935' : isWeekend(d) ? THEME.textMuted : THEME.textSecondary }"
          >
            <span class="date-day">{{ d.format('D') }}</span>
          </div>
        </div>

        <!-- 行：每个访客一行 -->
        <div class="chart-rows">
          <div
            v-for="v in visitors"
            :key="v.id"
            class="chart-row"
            :style="{ height: `${rowHeight}px`, borderColor: THEME.border }"
          >
            <!-- 日期格子背景 -->
            <div
              v-for="d in dateRange"
              :key="d.format('YYYY-MM-DD')"
              class="day-cell"
              :style="{
                width: `${cellWidth}px`,
                background: isToday(d) ? 'rgba(229,57,53,0.05)' : isWeekend(d) ? 'rgba(0,0,0,0.02)' : 'transparent'
              }"
            ></div>

            <!-- 甘特条 -->
            <div
              class="gantt-bar"
              :style="getTripStyle(v)"
              @click.stop="showDetail(v)"
              :title="`${v.name} | ${v.startDate} ~ ${v.endDate}`"
            >
              <span class="bar-label">{{ getDurationLabel(v.startDate, v.endDate) }}</span>
            </div>

            <!-- 今日指示线 -->
            <div
              v-if="isToday(dayjs(v.startDate)) || isToday(dayjs(v.endDate)) || (dayjs(v.startDate).isBefore(now) && dayjs(v.endDate).isAfter(now))"
              class="today-marker"
              :style="{ left: `${now.diff(dateRange[0], 'day') * cellWidth + cellWidth/2}px` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <Teleport to="body">
      <div v-if="selectedVisitor" class="detail-overlay" @click="closeDetail">
        <div class="detail-card" :style="{ background: THEME.cardBg }" @click.stop>
          <div class="detail-header" :style="{ borderColor: THEME.border }">
            <span class="detail-name">{{ selectedVisitor.name }}</span>
            <button class="detail-close" @click="closeDetail">✕</button>
          </div>
          <div class="detail-body">
            <div class="detail-row">
              <span class="detail-label">公司</span>
              <span class="detail-value">{{ selectedVisitor.company }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">部门</span>
              <span class="detail-value">{{ selectedVisitor.department }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">职位</span>
              <span class="detail-value">{{ selectedVisitor.position }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">电话</span>
              <span class="detail-value">{{ selectedVisitor.phone }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">出差时间</span>
              <span class="detail-value">
                {{ selectedVisitor.startDate }} ~ {{ selectedVisitor.endDate }}
                ({{ getDurationLabel(selectedVisitor.startDate, selectedVisitor.endDate) }})
              </span>
            </div>
            <div class="detail-row">
              <span class="detail-label">事由</span>
              <span class="detail-value">{{ selectedVisitor.note }}</span>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.gantt-page {
  min-height: 100vh;
  padding: 16px;
  box-sizing: border-box;
}

.gantt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid;
  border-radius: 8px;
  margin-bottom: 8px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: v-bind('THEME.textPrimary');
}

.visitor-count {
  font-size: 12px;
  color: v-bind('THEME.textMuted');
  background: v-bind('THEME.pageBg');
  padding: 2px 8px;
  border-radius: 10px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn, .today-btn {
  border: 1px solid v-bind('THEME.border');
  background: v-bind('THEME.cardBg');
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 13px;
  color: v-bind('THEME.textPrimary');
}

.today-btn {
  background: v-bind('THEME.accent');
  color: v-bind('THEME.textOnDark');
  border-color: v-bind('THEME.accent');
}

.month-label {
  font-size: 14px;
  font-weight: 500;
  color: v-bind('THEME.textPrimary');
  min-width: 100px;
  text-align: center;
}

.legend {
  display: flex;
  gap: 16px;
  padding: 8px 16px;
  border: 1px solid;
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 13px;
  color: v-bind('THEME.textSecondary');
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.gantt-body {
  display: flex;
  border: 1px solid;
  border-radius: 8px;
  overflow: hidden;
}

.visitor-list {
  flex-shrink: 0;
  width: 120px;
  border-right: 1px solid v-bind('THEME.border');
}

.list-header {
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 500;
  color: v-bind('THEME.textSecondary');
  border-bottom: 1px solid v-bind('THEME.border');
  background: v-bind('THEME.pageBg');
}

.list-rows {
  overflow-y: auto;
  max-height: calc(100vh - 200px);
}

.visitor-row {
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid v-bind('THEME.border');
  cursor: pointer;
  transition: background 0.15s;
}

.visitor-row:hover {
  background: v-bind('THEME.pageBg');
}

.visitor-name {
  font-size: 13px;
  color: v-bind('THEME.textPrimary');
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gantt-chart {
  flex: 1;
  overflow-x: auto;
  position: relative;
}

.chart-header {
  display: flex;
  height: 36px;
  border-bottom: 1px solid v-bind('THEME.border');
  background: v-bind('THEME.pageBg');
  position: sticky;
  top: 0;
  z-index: 2;
}

.date-cell {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.date-day {
  font-weight: 500;
}

.chart-rows {
  position: relative;
}

.chart-row {
  display: flex;
  position: relative;
  border-bottom: 1px solid v-bind('THEME.border');
}

.day-cell {
  flex-shrink: 0;
  height: 100%;
}

.gantt-bar {
  position: absolute;
  height: 28px;
  top: 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  cursor: pointer;
  transition: filter 0.15s;
  min-width: 4px;
}

.gantt-bar:hover {
  filter: brightness(0.95);
}

.bar-label {
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.today-marker {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #E53935;
  opacity: 0.5;
  pointer-events: none;
  z-index: 1;
}

/* 详情弹窗 */
.detail-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.detail-card {
  border-radius: 12px;
  width: 340px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  overflow: hidden;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid;
}

.detail-name {
  font-size: 16px;
  font-weight: 600;
  color: v-bind('THEME.textPrimary');
}

.detail-close {
  border: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  color: v-bind('THEME.textMuted');
}

.detail-body {
  padding: 12px 16px;
}

.detail-row {
  display: flex;
  gap: 8px;
  padding: 6px 0;
  font-size: 13px;
  border-bottom: 1px solid v-bind('THEME.border');
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  color: v-bind('THEME.textMuted');
  width: 70px;
  flex-shrink: 0;
}

.detail-value {
  color: v-bind('THEME.textPrimary');
  flex: 1;
}
</style>