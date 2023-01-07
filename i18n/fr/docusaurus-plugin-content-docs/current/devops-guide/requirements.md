---
id: devops-guide-requirements
title: Conditions
---

:::note
Jitsi Meet est un système en temps réel.
Les exigences sont très différentes d'un serveur Web et dépendent de nombreux facteurs. Les erreurs de calcul peuvent très facilement détruire les fonctionnalités de base plutôt que de ralentir les performances. Évitez d'ajouter d'autres fonctions à votre configuration Jitsi Meet car cela peut nuire aux performances et compliquer les optimisations.

Notez que la conception de Jitsi Meet donne la priorité à l'évolutivité en ajoutant des serveurs lors de l'utilisation d'un énorme serveur. Consultez la documentation Jitsi-videobridge sur l'ajout de plusieurs ponts à un serveur Jitsi Meet, et OCTO pour aller encore plus loin (fédération de serveurs Jitsi Meet). Si vous sentez que vous êtes un débutant en administration de réseau et de serveur, ne pensez même pas à y aller.
:::

# Jitsi Meet needs, by order of importance

- Liaison réseau : la vitesse et la fiabilité de base sont essentielles. Vérifiez la vitesse par rapport aux déclarations du fournisseur à l'aide de n'importe quel outil de téléchargement (ou ftp) et vérifiez la latence à l'aide d'un outil tel que iperf3. Le calcul exact est très complexe et dépend de nombreuses optimisations et astuces, mais vous devriez au moins vous souvenir de ces chiffres sur la résolution :
180 = 200 kbits/s
360 = 500 kbits/s
720 (HD) = 2500 kbits/s
4k = 10 Mbits/s

Ne vous attendez donc pas à avoir 20 utilisateurs utilisant 4K sur un serveur avec 100 Mbits/s de téléchargement et d'upload. Pour un serveur d'amis/petite organisation, 1 Gbits/s suffira souvent mais pour un serveur sérieux 10 Gbits/s
est conseillé. Plusieurs (ou plusieurs...) ponts ayant chacun une liaison à 10 Gbits/s sont utilisés par les gros déploiements.

**Ces exigences concernent le pont vidéo. S'il n'y a que des ponts vidéo externes (comme cela peut être le cas sur les serveurs Jitsi Meet haut de gamme), les performances du réseau importent beaucoup moins.**

- **RAM:** il est généralement suggéré d'obtenir 8 GB.
 Pour les petites réunions, vous pouvez vous contenter de 4 Go, pour les serveurs de test ou les très petites réunions, vous pouvez essayer d'utiliser 2 GB.
 Pour les grandes réunions, il est suggéré d'opter pour une solution évolutive plutôt que d'obtenir d'énormes quantités de mémoire.


- **CPU:** des performances de processeur très faibles peuvent gravement nuire à un système en temps réel, en particulier lors de l'utilisation d'un serveur partagé (où les performances de votre processeur peuvent être volées par d'autres clients de votre hébergeur, cochez la case "CPU dédié" si vous obtenez un VPS, plutôt qu'un physique serveur). Cependant, une considération est qu'un composant Jitsi Meet, Prosody, ne peut utiliser qu'UN (1) cœur. Donc, avoir beaucoup de cœurs, disons plus de 32, n'est pas toujours utile. Pour un serveur basique, 4 cœurs dédiés peuvent suffire.

- **Disk:** sauf si vous effectuez une journalisation intensive ou si vous avez des besoins très spécifiques, vous pouvez vous en sortir avec 20 Go de disque dur standard. Les SSD sont plus un plaisir qu'une nécessité.


**Si vous souhaitez des services supplémentaires, les exigences peuvent augmenter.**


# Recording

Jibri a besoin d'UN système par enregistrement.
Une instance Jibri = une réunion. Pour 5 réunions enregistrées simultanément, il vous faut 5 Jibris. Il n'y a pas de solution de contournement à cela. Si vous êtes bien informé, vous pouvez configurer Jibris dans des conteneurs et utiliser un gros serveur pour économiser un peu sur les ressources, mais c'est à peu près tout.

Les besoins en RAM et en processeur de Jibri sont bien plus élevés que ceux de Jitsi Meet lui-même, car il effectue l'encodage vidéo. Pour `1080x720` vous avez actuellement besoin d'au moins 8 Go de RAM, pour `1280x1024` 12 Go (ceci est pour l'enregistrement d'une __seule__ réunion). Si la mémoire n'est pas suffisante ou si le processeur ne peut pas encoder assez rapidement, les enregistrements échoueront.

Bien que Jibri et Jitsi Meet puissent techniquement être hébergés sur un seul serveur, ce n'est pas recommandé car Jibri est une fuite de ressources et cela peut nuire aux performances de Jitsi Meet, et peut épuiser l'espace disque et arrêter complètement la fonction Jitsi Meet.



