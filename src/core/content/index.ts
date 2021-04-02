import aggregateHooks from '../../hooks/index'

const initContentRuntime = async() => {
  await aggregateHooks()
}

initContentRuntime()