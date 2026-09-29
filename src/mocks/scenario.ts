const scenarios = ['default', 'slow', 'error', 'mutation-error', 'empty', 'many'] as const

export type Scenario = (typeof scenarios)[number]

// сценарий берём из адреса страницы: /?scenario=slow
export function getScenario(): Scenario {
  const value = new URLSearchParams(window.location.search).get('scenario')

  return scenarios.find((scenario) => scenario === value) ?? 'default'
}
