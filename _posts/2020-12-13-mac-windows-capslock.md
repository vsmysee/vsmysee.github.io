---
layout: article
title: 修改CapsLock
---

CapsLock占据了键盘的绝佳位置却不怎么干活,于是我们可以把它的功能用软件修改掉

Windows: AHK软件


AHK
```

SetCapsLockState, AlwaysOff

CapsLock::
Send, ^i
Send, {ESC}
SwitchIME(0x08040804)
return


CapsLock & +::send,{Volume_Up}
CapsLock & -::send,{Volume_Down}

SwitchIME(dwLayout){
    HKL:=DllCall("LoadKeyboardLayout", Str, dwLayout, UInt, 1)
    ControlGetFocus,ctl,A
    SendMessage,0x50,0,HKL,%ctl%,A
}

```
我通过按一次CapsLock,将发送ctrl + i,ESC 和修改注册表三格操作


MAC: Karabiner-Elements软件


```
{
  "global" : {
    "check_for_updates_on_startup" : true,
    "show_in_menu_bar" : true,
    "show_profile_name_in_menu_bar" : false
  },
  "profiles" : [ {
    "complex_modifications" : {
      "parameters" : {
        "basic.simultaneous_threshold_milliseconds" : 50,
        "basic.to_delayed_action_delay_milliseconds" : 500,
        "basic.to_if_alone_timeout_milliseconds" : 500,
        "basic.to_if_held_down_threshold_milliseconds" : 1000
      },
      "rules" : [
        {
          "description" : "caps lock : vim navigation + escape",
          "manipulators" : [ {
            "to_if_alone" : [ {
              "key_code" : "escape"
            } , {
              "key_code": "i",
              "modifiers": [
                "left_control"
              ]
            }],
            "to_after_key_up" : [ {
              "set_variable" : {
                "name" : "caps-lock-mode",
                "value" : 0
              }
            } ],
            "from" : {
              "key_code" : "caps_lock"
            },
            "to" : [ {
              "set_variable" : {
                "name" : "caps-lock-mode",
                "value" : 1
              }
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "h"
            },
            "to" : [ {
              "key_code" : "left_arrow"
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "j"
            },
            "to" : [ {
              "key_code" : "down_arrow"
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "k"
            },
            "to" : [ {
              "key_code" : "up_arrow"
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "l"
            },
            "to" : [ {
              "key_code" : "right_arrow"
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "h",
              "modifiers" : {
                "mandatory" : [ "left_shift" ]
              }
            },
            "to" : [ {
              "key_code" : "left_arrow",
              "modifiers" : [ "left_shift" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "j",
              "modifiers" : {
                "mandatory" : [ "left_shift" ]
              }
            },
            "to" : [ {
              "key_code" : "down_arrow",
              "modifiers" : [ "left_shift" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "k",
              "modifiers" : {
                "mandatory" : [ "left_shift" ]
              }
            },
            "to" : [ {
              "key_code" : "up_arrow",
              "modifiers" : [ "left_shift" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "l",
              "modifiers" : {
                "mandatory" : [ "left_shift" ]
              }
            },
            "to" : [ {
              "key_code" : "right_arrow",
              "modifiers" : [ "left_shift" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "h",
              "modifiers" : {
                "mandatory" : [ "left_command" ]
              }
            },
            "to" : [ {
              "key_code" : "left_arrow",
              "modifiers" : [ "left_command" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "j",
              "modifiers" : {
                "mandatory" : [ "left_command" ]
              }
            },
            "to" : [ {
              "key_code" : "down_arrow",
              "modifiers" : [ "left_command" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "k",
              "modifiers" : {
                "mandatory" : [ "left_command" ]
              }
            },
            "to" : [ {
              "key_code" : "up_arrow",
              "modifiers" : [ "left_command" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "l",
              "modifiers" : {
                "mandatory" : [ "left_command" ]
              }
            },
            "to" : [ {
              "key_code" : "right_arrow",
              "modifiers" : [ "left_command" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "h",
              "modifiers" : {
                "mandatory" : [ "left_command", "left_shift" ]
              }
            },
            "to" : [ {
              "key_code" : "left_arrow",
              "modifiers" : [ "left_command", "left_shift" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "j",
              "modifiers" : {
                "mandatory" : [ "left_command", "left_shift" ]
              }
            },
            "to" : [ {
              "key_code" : "down_arrow",
              "modifiers" : [ "left_command", "left_shift" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "k",
              "modifiers" : {
                "mandatory" : [ "left_command", "left_shift" ]
              }
            },
            "to" : [ {
              "key_code" : "up_arrow",
              "modifiers" : [ "left_command", "left_shift" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "l",
              "modifiers" : {
                "mandatory" : [ "left_command", "left_shift" ]
              }
            },
            "to" : [ {
              "key_code" : "right_arrow",
              "modifiers" : [ "left_command", "left_shift" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "h",
              "modifiers" : {
                "mandatory" : [ "left_option" ]
              }
            },
            "to" : [ {
              "key_code" : "left_arrow",
              "modifiers" : [ "left_option" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "j",
              "modifiers" : {
                "mandatory" : [ "left_option" ]
              }
            },
            "to" : [ {
              "key_code" : "down_arrow",
              "modifiers" : [ "left_option" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "k",
              "modifiers" : {
                "mandatory" : [ "left_option" ]
              }
            },
            "to" : [ {
              "key_code" : "up_arrow",
              "modifiers" : [ "left_option" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "l",
              "modifiers" : {
                "mandatory" : [ "left_option" ]
              }
            },
            "to" : [ {
              "key_code" : "right_arrow",
              "modifiers" : [ "left_option" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "h",
              "modifiers" : {
                "mandatory" : [ "left_option", "left_shift" ]
              }
            },
            "to" : [ {
              "key_code" : "left_arrow",
              "modifiers" : [ "left_option", "left_shift" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "j",
              "modifiers" : {
                "mandatory" : [ "left_option", "left_shift" ]
              }
            },
            "to" : [ {
              "key_code" : "down_arrow",
              "modifiers" : [ "left_option", "left_shift" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "k",
              "modifiers" : {
                "mandatory" : [ "left_option", "left_shift" ]
              }
            },
            "to" : [ {
              "key_code" : "up_arrow",
              "modifiers" : [ "left_option", "left_shift" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          }, {
            "from" : {
              "key_code" : "l",
              "modifiers" : {
                "mandatory" : [ "left_option", "left_shift" ]
              }
            },
            "to" : [ {
              "key_code" : "right_arrow",
              "modifiers" : [ "left_option", "left_shift" ]
            } ],
            "conditions" : [ {
              "name" : "caps-lock-mode",
              "value" : 1,
              "type" : "variable_if"
            } ],
            "type" : "basic"
          } ]
        } ]
    },
    "devices" : [ ],
    "fn_function_keys" : [ {
      "from" : {
        "key_code" : "f1"
      },
      "to" : {
        "consumer_key_code" : "display_brightness_decrement"
      }
    }, {
      "from" : {
        "key_code" : "f2"
      },
      "to" : {
        "consumer_key_code" : "display_brightness_increment"
      }
    }, {
      "from" : {
        "key_code" : "f3"
      },
      "to" : {
        "key_code" : "mission_control"
      }
    }, {
      "from" : {
        "key_code" : "f4"
      },
      "to" : {
        "key_code" : "launchpad"
      }
    }, {
      "from" : {
        "key_code" : "f5"
      },
      "to" : {
        "key_code" : "illumination_decrement"
      }
    }, {
      "from" : {
        "key_code" : "f6"
      },
      "to" : {
        "key_code" : "illumination_increment"
      }
    }, {
      "from" : {
        "key_code" : "f7"
      },
      "to" : {
        "consumer_key_code" : "rewind"
      }
    }, {
      "from" : {
        "key_code" : "f8"
      },
      "to" : {
        "consumer_key_code" : "play_or_pause"
      }
    }, {
      "from" : {
        "key_code" : "f9"
      },
      "to" : {
        "consumer_key_code" : "fastforward"
      }
    }, {
      "from" : {
        "key_code" : "f10"
      },
      "to" : {
        "consumer_key_code" : "mute"
      }
    }, {
      "from" : {
        "key_code" : "f11"
      },
      "to" : {
        "consumer_key_code" : "volume_decrement"
      }
    }, {
      "from" : {
        "key_code" : "f12"
      },
      "to" : {
        "consumer_key_code" : "volume_increment"
      }
    } ],
    "name" : "Default",
    "parameters" : {
      "delay_milliseconds_before_open_device" : 1000
    },
    "selected" : true,
    "simple_modifications" : [ ],
    "virtual_hid_keyboard" : {
      "country_code" : 0,
      "mouse_key_xy_scale" : 100
    }
  } ]
}


```
