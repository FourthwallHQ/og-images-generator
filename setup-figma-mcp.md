# Konfiguracja Figma MCP dla Claude Desktop

## 1. Zainstaluj Claude Desktop
Pobierz z: https://claude.ai/download

## 2. Uzyskaj Figma Personal Access Token
1. Idź do: https://www.figma.com/settings
2. Kliknij "Personal access tokens"
3. Wygeneruj nowy token
4. Skopiuj token

## 3. Skonfiguruj MCP w Claude Desktop

Utwórz plik `~/.config/claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "@figma/mcp-server"
      ],
      "env": {
        "FIGMA_ACCESS_TOKEN": "twój-figma-token-tutaj"
      }
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7"]
    }
  }
}
```

## 4. Restart Claude Desktop

## 5. Użycie w Claude Desktop:
1. Otwórz Figma Desktop
2. Włącz Dev Mode (Shift + D)
3. Wybierz frame
4. W Claude Desktop napisz: "Get the layout details from Figma"

## Alternatywa - użyj Cursor z MCP:

W Cursor możesz skonfigurować MCP i wtedy:
1. Wybierasz frame w Figmie
2. W Cursor piszesz prompt odnoszący się do Figmy
3. Cursor automatycznie pobiera dane przez MCP

## Dla Claude Code (przeglądarka):
Niestety nie ma bezpośredniego dostępu do MCP. Musisz:
1. Ręcznie skopiować dane z Figma Dev Mode
2. Lub zrobić screenshot
3. Lub użyć Claude Desktop/Cursor z MCP