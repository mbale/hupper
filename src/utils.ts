import { JSXInternal } from "preact/src/jsx";
import { render } from 'preact'

/**
 * Mounts root Preact component into DOM
 *
 * @param {JSXInternal.Element} rootComponent
 * @param {string} mountNode
 */
const mountRootComponent = (rootComponent: JSXInternal.Element, mountNode: string) => {
  const mountNodeDOM = document.getElementById(mountNode);

  if (!mountNodeDOM) {
    throw new Error('Invalid DOM ID')
  }

  render(rootComponent, mountNodeDOM);
}

/**
 * Wrapper over LocalStorage <-> ChromeStorage
 *
 * @class PersistDataLayer
 */
class PersistDataLayer {
  private readonly isChromeStorage = typeof chrome.storage?.local !== 'undefined' ?? false
  private readonly chromeStorage = chrome.storage?.local
  private readonly localStorage = window.localStorage

  async getItem<T extends object>(key: string): Promise<T | null> {
    return new Promise<T | null>((resolve, reject) => {
      if (this.isChromeStorage) {
        this.chromeStorage.get(key, (result: Record<string, T>) => {
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError.message)
          }

          const value = result[key] ?? null
          return resolve(value)
        })
      } else {
        try {
          const storageItem = this.localStorage.getItem(key)
          const item = storageItem ? JSON.parse(storageItem) as T : null
          return resolve(item)
        } catch (error) {
          return reject(error)
        }
      }
    })
  }

  async setItem(key: string, value: object) {
    return new Promise((resolve, reject) => {
      if (this.isChromeStorage) {
        this.chromeStorage.set({
          [key]: value
        }, () => {
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError.message)
          }
          return resolve(true)
        })
      } else {
        try {
          const serialValue = typeof value === 'string' ? value : JSON.stringify(value)
          return resolve(this.localStorage.setItem(key, serialValue))
        } catch (error) {
          return reject(error)
        }
      }
    })
  }
}

export const persistDataLayer = new PersistDataLayer()

export {
  mountRootComponent,
  PersistDataLayer
}