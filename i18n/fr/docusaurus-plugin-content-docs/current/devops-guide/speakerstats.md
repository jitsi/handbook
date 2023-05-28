---
id: speakerstats
title: Activer les statistiques des haut-parleurs
sidebar_label: Statistiques des orateurs
---

Pour activer les statistiques des haut-parleurs, nous devons activer le module speakerstats sous le principal
hôte virtuel, cela permet d'activer la publicité du composant de statistiques de haut-parleur, dont l'adresse doit être spécifiée dans l'option `speakerstats_component`.

Nous devons également activer le composant avec l'adresse spécifiée dans `speakerstats_component`. Le composant doit également avoir l'option avec l'adresse du composant muc dans l'option `muc_component`.

```lua
VirtualHost "jitsi.example.com"
    speakerstats_component = "speakerstats.jitsi.example.com"
    modules_enabled = {
        "speakerstats";
    }
Component "speakerstats.jitsi.example.com" "speakerstats_component"
    muc_component = "conference.jitsi.example.com"
Component "conference.jitsi.example.com" "muc"
```