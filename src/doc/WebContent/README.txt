The Thymol template examples provided in this archive should be configured before use.
Do this by globally replacing the placeholder value "${thInstall}" with a fully qualified file URI that points to the Thymol javascript file you wish to work with.

For example:

    <script th:remove="all" type="text/javascript" src="${thInstall}/thymol.js" data-thymol-load="pages.js"></script>		

might become:

    <script th:remove="all" type="text/javascript" src="file:///home/tester/project/thymol/thymol.js" data-thymol-load="pages.js"></script>
    
Please report any issues to:

	https://github.com/thymol/thymol.js/issues
		
